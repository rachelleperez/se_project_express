const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");
const { ERROR_MSG } = require("../utils/errors");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // hides password, wont be returned by default
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  // if any args missing
  if (email === null || password === null) {
    return Promise.reject(new Error(ERROR_MSG.debug));
  }

  // trying to find the user by email
  return this.findOne({ email }) // this — the User model
    .select("+password") // retrives hidden hash
    .then((userData) => {
      // not found  email - rejecting the promise
      if (!userData) {
        return Promise.reject(new Error(ERROR_MSG.invalidEmail));
      }

      // found email, checking password
      return bcrypt.compare(password, userData.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(ERROR_MSG.invalidPassword));
        }
        return userData;
      });
    });
};

module.exports = mongoose.model("user", user);
