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

// // VALIDATION HELPER 2 > IDs must be a hexadecimal value length of 24 characters.
// const validateIDFormat = celebrate({
//   params: Joi.object().keys({
//     itemId: Joi.string().hex().length(24),
//   }),
// });

// Authorization Header starts with "Bearer "

const validateAuthorizationHeader = (value, helpers) => {
  if (value.startsWith("Bearer ")) {
    return value;
  }
  return helpers.error("string.token");
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

  // headers: confirming token will be able to be extracted instead of waiting until middleware whichwoulr return UnathorizedUser error
  headers: Joi.object().keys({
    authorization: Joi.string()
      .required()
      .custom(validateAuthorizationHeader)
      .messages({
        "string.empty": "Inbound user token missing",
        "string.token": "Inbound user token is not valid",
      }),
  }),
});

const validateCreateUser = celebrate({
  // body: name is required and has 2-30 chars, avat is required and valid, email is required & valid, password is required
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The Avatar URL field is required",
      "string.uri": "The Avatar URL is not a valid url",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The Avatar URL field is required",
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
      "string.empty": "The Avatar URL field is required",
      "string.email": "The email provided is a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required",
    }),
  }),
});

// VALIDATION 4 > user or clothing id format, each time _id is accessed (req.body)

// IDs must be a hexadecimal value length of 24 characters.

// VALIDATION 5 > user or clothing id format, each time _id is accessed (headers, parameters, or req.query)

// same function as before???

module.exports = {
  validateCreateClothingItem,
  validateCreateUser,
  validateLogin,
};
