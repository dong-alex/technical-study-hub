const Joi = require("joi");

const minQuestionLength = 5;
const maxQuestionLength = 200;

const questionValidationSchema = Joi.object({
  name: Joi.string()
    .min(minQuestionLength)
    .max(maxQuestionLength)
    .required()
    .messages({
      "string.base": `Question name should be a type of '
text'`,
      "string.empty": `Question name can not be an empty field`,
      "string.min": `Question name should have a minimum length of ${minQuestionLength}`,
      "string.max": `Question name should have a maximum length of ${maxQuestionLength}`,
      "any.required": `Question name is a required field`,
    }),
  url: Joi.string()
    .uri({ scheme: /https:?/ })
    .messages({
      "string.uri": `URL must direct to a valid leetcode problem`,
      "string.uriCustomScheme": `URL must direct to a valid leetcode problem`,
      "string.empty": `Empty URL. Please enter a valid leetcode URL.`,
    }),
  difficulty: Joi.string().valid("Easy", "Medium", "Hard").required().messages({
    "any.only": `Difficulty must be one of 'Easy', 'Medium', or 'Hard'`,
  }),
  tags: Joi.array().items(Joi.string()).messages({
    "array.includes": "Tags should only contain their IDs",
  }),
  notes: Joi.array().items(Joi.string()).messages({
    "array.includes": "Notes should only contain strings",
  }),
});

module.exports = questionValidationSchema;
