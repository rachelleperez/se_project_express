const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const {
  ERROR_MSG,
  // BadRequestError,
  ConflictError,
  // ForbiddenError,
  // InternalServerError,
  NotFoundError,
  UnauthorizedError,
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
      return bcrypt
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
        .catch(() => {
          throw new UnauthorizedError(ERROR_MSG.invalidPassword);
        });
    })
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  user // orFail not needed, is no data, ok with empty array
    .find({})
    // .then((users) => res.status(HTTP_STATUS.OK).send(users)) // // Status 200 is added by default: https://nodejs.org/en/guides/anatomy-of-an-http-transaction#http-status-code
    .then((users) => res.send(users))
    .catch((err) => next(err));
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
    .catch(() => {
      next(new NotFoundError(ERROR_MSG.unknownUserId));
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
    .catch((e) => {
      // if not validation error, then user not found
      if (e.name !== "ValidationError") {
        next(new NotFoundError(ERROR_MSG.unknownUserId));
      } else {
        next(new BadRequestError(ERROR_MSG.validation));
      }
    });
};
