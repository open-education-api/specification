const NoItemsArray = () => {
  return {
    Schema: {
      enter(schema, ctx) {
        if (schema.items && Array.isArray(schema.items)) {
          ctx.report({
            message: 'items moet een object zijn, niet een array. Gebruik "items: {$ref: ...}" in plaats van "items: - $ref: ..."',
            location: ctx.location.child('items')
          });
        }
      }
    }
  };
};

module.exports = {
  id: 'custom-rules',
  rules: {
    oas3: {
      'no-items-array': NoItemsArray,
    }
  }
};
