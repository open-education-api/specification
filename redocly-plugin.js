const NoItemsArray = () => {
  return {
    Schema: {
      enter(schema, ctx) {
        if (schema.items && Array.isArray(schema.items)) {
          ctx.report({
            message: 'items must be an object, not an array. Use "items: {$ref: ...}" instead of "items: - $ref: ..."',
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
