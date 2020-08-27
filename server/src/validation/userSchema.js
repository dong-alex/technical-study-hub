// validates the user schema before applying to database - follows rules in database

const Joi = require("joi");

const nameMinLength = 5;
const nameMaxLength = 20;

const userValidationSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required()
    .messages({
      "string.base": `"name" should be a type of '
  text'`,
      "string.empty": `"name" can not be an empty field`,
      "string.min": `"name" should have a minimum length of ${nameMinLength}`,
      "string.max": `"name" should have a maximum length of ${nameMaxLength}`,
      "any.required": `"name" is a required field`,
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base": `"password" should not contain any special characters i.e. !, @, #`,
    }),
  email: Joi.string().email().required().messages({
    "string.email": `"email" should be valid format`,
  }),
});

module.exports = userValidationSchema;
