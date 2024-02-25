const Joi = require('joi');

// User validation schema
const userValidationSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = userValidationSchema;
