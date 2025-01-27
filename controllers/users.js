const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const {
  ERROR_MSG,
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors/index");

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email } = req.body;

  user
    .findOne({ email })
    .then((userData) => {
      // if email found
      if (userData) {
        return next(new ConflictError(ERROR_MSG.existingEmail));
      }
      // else, new email
      return (
        bcrypt
          .hash(req.body.password, 10) // dont extract password until needed
          .then((hash) => user.create({ name, avatar, email, password: hash }))
          .then((userIn) => {
            res.status(201).send({
              data: {
                name: userIn.name,
                avatar: userIn.avatar,
                email: userIn.email,
              },
            }); // don't return password
          })
          // if it reaches catch below, it was a validation error
          .catch((err) => {
            if (err.name === "ValidationError") {
              next(new BadRequestError(ERROR_MSG.validation));
            } else {
              next(err);
            }
          })
      );
    })
    .catch((err) => {
      // console.log("Error from outer catch", err);
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // const args_missing = false;
  // if (!email | !password) args_missing = true;

  return user
    .findUserByCredentials(email, password)
    .then((userData) => {
      // authentication successful!
      const token = jwt.sign({ _id: userData._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token }); // return the token to client
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  user
    .findById(req.user._id) // as a resul of "req.user = payload" in middleware
    .orFail()
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MSG.unknownItemId));
      } else {
        next(err);
      }
    });
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;

  user
    .findByIdAndUpdate(
      { _id: req.user._id },
      { name, avatar },
      {
        new: true, // then handler receives updated document
        runValidators: true, // validate data before update
      },
    )
    .orFail()
    .then((userData) => res.send(userData))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError(ERROR_MSG.validation));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MSG.unknownItemId));
      } else {
        next(err);
      }
    });
};
