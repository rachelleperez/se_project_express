const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

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
    minlength: 8,
    select: false, // hides password, wont be returned by default
  },
});

// models/user.js

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  // trying to find the user by email
  return this.findOne({ email }) // this — the User model
    .select("+password") // retrives hidden hash
    .then((user) => {
      // not found - rejecting the promise
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      // found - comparing hashes
      return bcrypt.compare(password, user.password);
    });
};

module.exports = mongoose.model("user", user);
