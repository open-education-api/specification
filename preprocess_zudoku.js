#!/usr/bin/env node

/**
 * OpenAPI Preprocessor for Zudoku
 * Creates flat allOf structures without nesting
 * Also injects an internal placeholder operation for tags
 * that exist in tags/x-tagGroups but are not used by any operation.
 * Generates examples from schema properties for responses without examples.
 */

const fs = require('fs');

function resolveRef(refPath, spec) {
  if (!refPath.startsWith('#/')) return null;
  const parts = refPath.substring(2).split('/');
  let current = spec;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current;
}

function getSchemaNameFromPath(path, method) {
  const cleanPath = path.replace(/\//g, ' ').replace(/-/g, ' ');
  const words = cleanPath.split(' ').filter(w => w);
  const schemaName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') +
    method.charAt(0).toUpperCase() + method.slice(1) + 'Request';
  return schemaName;
}

function flattenAllOfForZudoku(schema, spec) {
  if (!schema.allOf) return null;
  const flatAllOf = [];
  const inlineProperties = {};
  let anyOfSection = null;
  const requiredFields = schema.required || [];

  for (const item of schema.allOf) {
    if (item.$ref) {
      const refSchema = resolveRef(item.$ref, spec);
      if (refSchema?.allOf) {
        for (const subItem of refSchema.allOf) {
          if (subItem.$ref) {
            flatAllOf.push(subItem);
          } else if (subItem.properties) {
            Object.assign(inlineProperties, subItem.properties);
            if (subItem.anyOf) {
              anyOfSection = subItem.anyOf;
              if (anyOfSection.length > 0 && !anyOfSection[0].title) {
                anyOfSection[0].title = 'With courseOfferingId';
              }
            }
          }
        }
      } else {
        flatAllOf.push(item);
      }
    } else if (item.properties) {
      Object.assign(inlineProperties, item.properties);
    }
  }

  const inlineObj = {
    type: 'object',
    properties: inlineProperties
  };
  if (anyOfSection) {
    inlineObj.anyOf = anyOfSection;
  }

  flatAllOf.push(inlineObj);

  const result = {
    type: 'object',
    allOf: flatAllOf
  };
  if (requiredFields.length > 0) {
    result.required = requiredFields;
  }

  return result;
}

function generateExampleFromSchema(schema, spec, seenRefs = [], depth = 0) {
  if (!schema) return null;
  
  // Prevent too deep nesting
  if (depth > 15) return null;
  
  // Resolve $ref if present
  if (schema.$ref) {
    // Check if this ref is in the current path (circular in THIS branch)
    // Count how many times we've seen this ref in the current branch
    const refCount = seenRefs.filter(r => r === schema.$ref).length;
    
    // Allow seeing a ref once (depth 0), but not twice (would be circular)
    // For arrays at shallow depth, allow one level of recursion
    if (refCount >= 1 && depth > 3) {
      return null; // Skip deep circular references
    }
    
    if (refCount >= 2) {
      return null; // Never allow more than 2 levels deep
    }
    
    // Add to seen refs for this branch
    const newSeenRefs = [...seenRefs, schema.$ref];
    
    const resolved = resolveRef(schema.$ref, spec);
    if (resolved) {
      return generateExampleFromSchema(resolved, spec, newSeenRefs, depth + 1);
    }
    return null;
  }
  
  if (schema.example !== undefined) {
    return schema.example;
  }
  
  // Handle allOf - merge all properties
  if (schema.allOf) {
    const merged = {};
    for (const subSchema of schema.allOf) {
      const subExample = generateExampleFromSchema(subSchema, spec, seenRefs, depth + 1);
      if (subExample && typeof subExample === 'object' && !Array.isArray(subExample)) {
        Object.assign(merged, subExample);
      }
    }
    return Object.keys(merged).length > 0 ? merged : null;
  }
  
  // Handle oneOf - take first option
  if (schema.oneOf && schema.oneOf.length > 0) {
    return generateExampleFromSchema(schema.oneOf[0], spec, seenRefs, depth + 1);
  }
  
  // Handle anyOf - take first option
  if (schema.anyOf && schema.anyOf.length > 0) {
    return generateExampleFromSchema(schema.anyOf[0], spec, seenRefs, depth + 1);
  }
  
  // Handle type as array (e.g., ["null", "object"])
  let type = schema.type;
  if (Array.isArray(type)) {
    // Filter out null and take first non-null type
    const nonNullTypes = type.filter(t => t !== 'null');
    type = nonNullTypes.length > 0 ? nonNullTypes[0] : type[0];
  }
  
  if (type === 'array') {
    if (schema.items) {
      const itemExample = generateExampleFromSchema(schema.items, spec, seenRefs, depth + 1);
      // At shallow depth (< 4), include items to show structure
      // This allows one level of self-referencing arrays like children: [AcademicSession]
      if (itemExample !== null && depth < 4) {
        return [itemExample];
      }
    }
    return [];
  }
  
  if (type === 'object' || schema.properties) {
    const example = {};
    
    if (schema.properties) {
      for (const [key, prop] of Object.entries(schema.properties)) {
        const value = generateExampleFromSchema(prop, spec, seenRefs, depth + 1);
        if (value !== null) {
          example[key] = value;
        }
      }
    }
    
    return Object.keys(example).length > 0 ? example : null;
  }
  
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum[0];
  }
  
  if (schema.default !== undefined) {
    return schema.default;
  }
  
  switch (type) {
    case 'string':
      return schema.format === 'date-time' ? '2024-01-01T00:00:00Z' :
             schema.format === 'date' ? '2024-01-01' :
             schema.format === 'email' ? 'user@example.com' :
             schema.format === 'uri' ? 'https://example.com' :
             schema.format === 'uuid' ? '123e4567-e89b-12d3-a456-426614174000' :
             'string';
    case 'number':
      return 0;
    case 'integer':
      return 0;
    case 'boolean':
      return false;
    case 'null':
      return null;
    default:
      return null;
  }
}

function addExamplesToResponses(spec) {
  let addedCount = 0;
  let totalResponses = 0;
  let hasExample = 0;
  let noSchema = 0;
  let emptyGenerated = 0;
  let debugDetails = [];
  
  for (const [path, methods] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (typeof operation !== 'object') continue;
      
      if (operation.responses) {
        for (const [status, response] of Object.entries(operation.responses)) {
          if (!response || typeof response !== 'object') continue;
          
          if (response.content) {
            for (const [mediaType, content] of Object.entries(response.content)) {
              if (!content || typeof content !== 'object') continue;
              
              totalResponses++;
              
              if (content.example || content.examples) {
                hasExample++;
                continue;
              }
              
              if (!content.schema) {
                noSchema++;
                continue;
              }
              
              const generated = generateExampleFromSchema(content.schema, spec, []);
              
              if (!generated || (typeof generated === 'object' && Object.keys(generated).length === 0)) {
                emptyGenerated++;
                debugDetails.push({
                  path: `${method.toUpperCase()} ${path} (${status})`,
                  schema: content.schema.$ref || 'inline',
                  generated: generated
                });
                continue;
              }
              
              content.example = generated;
              addedCount++;
            }
          }
        }
      }
    }
  }
  
  console.log(`\n📊 Response analysis:`);
  console.log(`  Total responses with content: ${totalResponses}`);
  console.log(`  Already had examples: ${hasExample}`);
  console.log(`  No schema: ${noSchema}`);
  console.log(`  Generated empty (failed): ${emptyGenerated}`);
  console.log(`  ✅ Added examples: ${addedCount}`);
  
  if (debugDetails.length > 0) {
    console.log(`\n⚠️  First 5 failed generations:`);
    for (let i = 0; i < Math.min(5, debugDetails.length); i++) {
      console.log(`  - ${debugDetails[i].path}`);
      console.log(`    Schema: ${debugDetails[i].schema}`);
      console.log(`    Generated: ${JSON.stringify(debugDetails[i].generated)}`);
    }
  }
  
  return addedCount;
}

function slugifyTag(tag) {
  return String(tag)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseSchemaRefFromDescription(desc) {
  if (!desc) return null;
  const m = String(desc).match(/<SchemaDefinition\s+schemaRef\s*=\s*"([^"]+)"\s*\/?>/i);
  return m ? m[1] : null;
}

function schemaNameFromRef(ref) {
  const m = String(ref).match(/#\/components\/schemas\/(.+)$/);
  return m ? m[1] : null;
}

function slugifyPathPart(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isInjectedPlaceholderOperation(op) {
  if (!op || typeof op !== 'object') return false;
  const summary = String(op.summary || '').toLowerCase();
  const description = String(op.description || '').toLowerCase();
  return summary.startsWith('zudoku placeholder') || description.includes('injected so zudoku');
}

function injectModelOperations(spec) {
  if (!spec.paths || typeof spec.paths !== 'object') spec.paths = {};
  const tagsArr = Array.isArray(spec.tags) ? spec.tags : [];
  let injected = 0;

  for (const t of tagsArr) {
    if (!t || typeof t !== 'object') continue;
    const tagName = t.name;
    if (!tagName || !String(tagName).endsWith('_model')) continue;

    const schemaRef = parseSchemaRefFromDescription(t.description);
    if (!schemaRef) continue;

    const schemaName = schemaNameFromRef(schemaRef);
    if (!schemaName) continue;

    const display = t['x-displayName'] || schemaName;
    const pathKey = `/_zudoku/models/${slugifyPathPart(display)}`;

    if (!spec.paths[pathKey]) spec.paths[pathKey] = {};
    // Do not override if already present
    if (spec.paths[pathKey].get) continue;

    spec.paths[pathKey].get = {
      tags: [tagName],
      summary: `Zudoku model for ${display}`,
      description: 'Documentation only. Injected so Zudoku renders this model schema.',
      'x-internal': true,
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: schemaRef }
            }
          }
        }
      }
    };

    // Replace unsupported component-like markup in tag description
    t.description = `Schema: ${display}.`;
    injected += 1;
  }

  // Remove old text-only placeholders for model tags under /_zudoku/tags/*
  for (const [p, methods] of Object.entries(spec.paths)) {
    if (!p.startsWith('/_zudoku/tags/')) continue;
    if (!methods || typeof methods !== 'object') continue;

    for (const [method, op] of Object.entries(methods)) {
      if (!isInjectedPlaceholderOperation(op)) continue;
      const tags = Array.isArray(op.tags) ? op.tags : [];
      if (!tags.some(x => String(x).endsWith('_model'))) continue;
      delete spec.paths[p][method];
    }

    if (Object.keys(spec.paths[p]).length === 0) {
      delete spec.paths[p];
    }
  }

  return injected;
}

function markTagsWithOnlyInjected(spec) {
  const tagStats = new Map();

  for (const methods of Object.values(spec.paths || {})) {
    for (const op of Object.values(methods || {})) {
      if (!op || typeof op !== 'object' || !Array.isArray(op.tags)) continue;
      const summary = String(op.summary || '').toLowerCase();
      const isInjected = summary.startsWith('zudoku placeholder') || summary.startsWith('zudoku model');

      for (const tag of op.tags) {
        if (!tagStats.has(tag)) {
          tagStats.set(tag, { real: 0, injected: 0 });
        }
        const stats = tagStats.get(tag);
        if (isInjected) {
          stats.injected++;
        } else {
          stats.real++;
        }
      }
    }
  }

  let marked = 0;
  for (const t of (spec.tags || [])) {
    if (!t || typeof t !== 'object' || !t.name) continue;
    const stats = tagStats.get(t.name);
    if (stats && stats.real === 0 && stats.injected > 0) {
      // Voeg custom property toe voor CSS matching
      t['x-zudoku-hide-chevron'] = true;
      marked++;
    }
  }

  console.log(`✅ Marked ${marked} tags with only injected operations`);
  return marked;
}

function preprocessForZudoku(inputFile, outputFile) {
  const spec = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  spec.components = spec.components || {};
  spec.components.schemas = spec.components.schemas || {};
  spec.paths = spec.paths || {};

  // Flatten certain requestBody allOf patterns for Zudoku
  for (const [path, methods] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (typeof operation !== 'object') continue;

      const requestBody = operation.requestBody?.content?.['application/json']?.schema;
      if (!requestBody) continue;

      if (requestBody.allOf) {
        const flattened = flattenAllOfForZudoku(requestBody, spec);
        if (flattened) {
          const schemaName = getSchemaNameFromPath(path, method);
          spec.components.schemas[schemaName] = flattened;
          operation.requestBody.content['application/json'].schema = {
            $ref: `#/components/schemas/${schemaName}`
          };
        }
      }
    }
  }

  // Add examples to responses without examples
  addExamplesToResponses(spec);

  // Inject model operations (schema-driven)
  const injectedModels = injectModelOperations(spec);

  // Collect defined tags (from tags and x-tagGroups)
  const definedTags = new Set();
  for (const t of (spec.tags || [])) {
    if (t && typeof t === 'object' && t.name) definedTags.add(t.name);
  }

  for (const g of (spec['x-tagGroups'] || [])) {
    for (const t of ((g && g.tags) || [])) {
      if (typeof t === 'string') definedTags.add(t);
    }
  }

  // Collect used tags (from operations)
  const usedTags = new Set();
  for (const methods of Object.values(spec.paths || {})) {
    for (const op of Object.values(methods || {})) {
      if (op && Array.isArray(op.tags)) {
        for (const t of op.tags) usedTags.add(t);
      }
    }
  }

  // Inject placeholder operations for unused tags (text-only)
  let injected = 0;
  for (const tag of definedTags) {
    if (usedTags.has(tag)) continue;
    const path = `/_zudoku/tags/${slugifyTag(tag) || 'tag'}`;
    if (!spec.paths[path]) spec.paths[path] = {};

    spec.paths[path].get = {
      tags: [tag],
      summary: `Zudoku placeholder for tag ${tag}`,
      description: 'Documentation only. Injected so Zudoku shows this tag in navigation.',
      'x-internal': true,
      responses: {
        '204': { description: 'No content' }
      }
    };
    injected += 1;
  }

  // Mark tags with only injected operations
  markTagsWithOnlyInjected(spec);

  fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2));
  console.log(`✅ Zudoku version created: ${outputFile}`);
  console.log(`✅ Injected placeholder operations (internal): ${injected}`);
}

if (require.main === module) {
  if (process.argv.length !== 4) {
    console.log('Usage: preprocess_zudoku.js <input> <output>');
    process.exit(1);
  }

  preprocessForZudoku(process.argv[2], process.argv[3]);
}

module.exports = { preprocessForZudoku };
