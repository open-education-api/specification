// node build_oeapi.js source/spec.yaml oeapi.json oeapi.yaml oeapi.zudoku.json /specification/unreleased

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";

function run(cmd, args, env = {}) {
  const r = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
  if (r.status !== 0) process.exit(r.status);
}

const [spec, json, yaml, zudokujson, webpad] = process.argv.slice(2);

if (!spec || !json || !yaml || !zudokujson || !webpad) {
  console.error(
    "Usage: node build_oeapi.js <spec:source/spec.yaml> <json:oeapi.json> <yaml:oeapi.yaml> <zudokujson:oeapi.zudoku.json> <webpad:/specification/unreleased>"
  );
  process.exit(1);
}

const specText = readFileSync(spec, "utf8");
const info = specText.match(/^info:\s*\r?\n((?:^[ \t]+.*\r?\n|^\s*\r?\n)*)/m)?.[1];
const version = info?.match(/^[ \t]+version:\s*["']?([^\s"'#]+)["']?\s*(?:#.*)?$/m)?.[1];
const errors = [];
if (!version) {
  errors.push(`Cannot find info.version in ${spec}`);
}

const indexLines = readFileSync("index.mdx", "utf8").split(/\r?\n/);
if (version) {
  const expectedTitle = `OEAPI - V${version}`;
  if (!indexLines.some((line) => /^(?:#\s+|title:\s*["']?)/.test(line.trim()) && line.includes(`${expectedTitle} `))) {
    const foundTitle = indexLines[0]?.match(/^#\s+OEAPI\s+-\s+\S+/)?.[0];
    errors.push(`index.mdx: expected title "${expectedTitle} ..."; found: ${foundTitle ? `${foundTitle} ...` : indexLines[0] ?? "(missing)"}`);
  }

  for (const [lineNumber, extension] of [[5, "yaml"], [6, "json"]]) {
    const expectedFile = `oeapi-${version}.${extension}`;
    const foundPath = indexLines[lineNumber - 1]?.match(/href=["']([^"']+)["']/)?.[1];
    if (basename(foundPath ?? "") !== expectedFile) {
      errors.push(`index.mdx:${lineNumber}: expected download file ${expectedFile}; found: ${foundPath ?? "(missing)"}`);
    }
  }
}
if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}

const versionedFile = (file) => file.slice(0, -extname(file).length) + `-${version}` + extname(file);
const versionedJson = versionedFile(json);
const versionedYaml = versionedFile(yaml);

// bundle specification
run("npm", ["i", "-g", "@redocly/cli@latest"]);
run("redocly", ["bundle", spec, "-o", versionedJson]);
run("redocly", ["bundle", spec, "-o", versionedYaml]);

// preprocess specification for zudoku
run("node", ["preprocess_zudoku.js", versionedJson, zudokujson]);

// build zudoku static website
run("npm", ["i", "zudoku", "react", "react-dom"]);
run("npx", ["zudoku", "build"], { ZUDOKU_PUBLIC_BASEPATH: webpad, NODE_OPTIONS: "--no-webstorage" });
