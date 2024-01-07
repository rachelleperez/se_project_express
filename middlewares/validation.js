const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// ----------------- VALIDATION HELPERS -------------------

// VALIDATION HELPER 1 > makes sure URL is valid

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// ----------------- VALIDATION FUNCTIONS -------------------

const validateCreateClothingItem = celebrate({
  // body: name is required and has 2-30 chars, imageURL is a valid url
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The Image field, with an image URL, is required",
      "string.uri": "The Image URL is not a valid url",
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "string.empty": "Weather type missing",
      "any.only": "Weather type values can only be: hot, warm, or cold",
    }),
  }),
});

const validateCreateUser = celebrate({
  // body: name is required and has 2-30 chars, avat is required and valid, email is required & valid, password is required
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": "The name field is required",
      "string.min": "The name must have at least 2 characters",
      "string.max": "The name must have at max 30 characters",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The Avatar URL field is required",
      "string.uri": "The Avatar URL is not a valid url",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field is required",
      "string.email": "The email provided is a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required",
    }),
  }),
});

const validateLogin = celebrate({
  // body: email is required & valid, password is required
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field is required",
      "string.email": "The email provided is a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required",
    }),
  }),
});

// validates item id
const validateItemId = celebrate({
  // params: IDs must be a hexadecimal value length of 24 characters.
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).messages({
      "string.empty": "The Item ID is a required parameter",
      "string.hex": "The Item ID is not a hex value",
      "string.length": "The Item ID must be 24 characters long",
    }),
  }),
});

const validateUpdateCurrentUser = celebrate({
  // body: name is required and has 2-30 chars, avatar could be empty as there is a placeholder version when so
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": "The name field is required",
      "string.min": "The name must have at least 2 characters",
      "string.max": "The name must have at max 30 characters",
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": "The Avatar URL is not a valid url",
    }),
  }),
});

module.exports = {
  validateCreateClothingItem,
  validateCreateUser,
  validateLogin,
  validateItemId,
  validateUpdateCurrentUser,
};
