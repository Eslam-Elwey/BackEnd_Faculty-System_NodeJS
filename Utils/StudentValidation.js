const Ajv = require("ajv");
const ajv = new Ajv();

// #region studentValidation

const studentSchema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^[a-zA-Z]*$" },
    dept: {
      type: "string",
      enum: ["UI", "ES", "MB", "AI"],
      minLength: 2,
      maxLength: 2,
    },
  },
  required: ["name", "dept"],
  additionalProperties: false,
};

module.exports = ajv.compile(studentSchema);

//#endregion
