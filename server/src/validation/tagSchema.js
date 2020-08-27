const Joi = require("joi");

const tagMinLength = 2;
const tagMaxLength = 20;

const tagValidationSchema = Joi.object({
  tagName: Joi.string()
    .min(tagMinLength)
    .max(tagMaxLength)
    .required()
    .messages({
      "string.base": `Tag name should be a type of '
text'`,
      "string.empty": `Tag name can not be an empty field`,
      "string.min": `Tag name should have a minimum length of ${tagMinLength}`,
      "string.max": `Tag name should have a maximum length of ${tagMaxLength}`,
      "any.required": `Tag name is a required field`,
    }),
  tagColor: Joi.string().pattern(new RegExp("^#([0-9a-f]{3}){1,2}$")).messages({
    "string.pattern.base": `Tag color should be in a valid hex format`,
  }),
});

module.exports = tagValidationSchema;
