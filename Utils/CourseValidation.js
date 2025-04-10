const Ajv = require("ajv");
const ajv = new Ajv();

// #region courseValidation
const courseSchema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^[a-zA-Z]*$" },
    deg: { type: "number", minimum: 50, maximum: 100 },
  },
  required: ["name", "deg"],
  additionalProperties: false,
};

module.exports = ajv.compile(courseSchema);
//#endregion
