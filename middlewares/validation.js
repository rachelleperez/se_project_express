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

// VALIDATION HELPER 2 > IDs must be a hexadecimal value length of 24 characters.
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

// VALIDATION HELPER 3 > Authorization Header starts with Bearere

const validateAuthorizationHeader = (value, helpers) => {
  if (value.startsWith("Bearer ")) {
    return value;
  }
  return helpers.error("string.token");
};

// ----------------- VALIDATION FUNCTIONS -------------------

// VALIDATION > createClothingItem (req.body)

// const { name, weather, imageUrl } = req.body;
// owner: req.user._id

// headers: {
//     "Content-type": "application/json",
//     authorization: `Bearer ${localStorage.getItem("jwt")}`,
//   },

// The item name is a required string of between 2 and 30 characters.
// An image URL is a required string in a URL format.

const validateCreateClothingItem = celebrate({
  // body: name is required and has 2-30 chars, imageURL is a valid url
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The Image field, with an image URL, is required",
      "string.uri": "The Image URL is not valid",
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
        "string.token": "Inbound user token is not valid",
      }),
  }),
});

// VALIDATION 2 > signup (req.body)

// const { name, avatar, email } = req.body;

// The user name is a string of between 2 and 30 characters.
// The user avatar is a required string in a URL format.
// Email is a required string in a valid email format.
// Password is a required string.

// REMEMBER avatar is optional!!

// VALIDATION 3 > signin (req.body)

// Email is a required string in a valid email format.
// Password is a required string.

// VALIDATION 4 > user or clothing id format, each time _id is accessed (req.body)

// IDs must be a hexadecimal value length of 24 characters.

// VALIDATION 5 > user or clothing id format, each time _id is accessed (headers, parameters, or req.query)

// same function as before???

module.exports = {
  validateCreateClothingItem,
};
