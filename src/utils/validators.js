const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(128)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
    .message('Password must contain upper, lower and number')
    .required(),
  displayName: Joi.string().max(100).optional(),
  dob: Joi.date().less('now').optional(),
  gender: Joi.string().optional(),
  sexualOrientation: Joi.string().optional(),
  pronouns: Joi.string().optional(),
  interestedIn: Joi.array().items(Joi.string()).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { signupSchema, loginSchema };
