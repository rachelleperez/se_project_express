const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const {
  HTTP_STATUS,
  handleRequestError,
  ERROR_MSG,
} = require("../utils/errors");

module.exports.createUser = (req, res) => {
  console.log("CreateUser");
  console.log(req.body);
  const { name, avatar, email } = req.body;

  user
    .findOne({ email })
    .then((userData) => {
      // if email found
      if (userData) {
        return Promise.reject(new Error(ERROR_MSG.invalidEmailPassword));
      }
      // else, new email
      return bcrypt
        .hash(req.body.password, 10) // dont extract password until needed
        .then((hash) => user.create({ name, avatar, email, password: hash }))
        .then((userIn) => {
          res.status(HTTP_STATUS.Created).send({
            data: {
              name: userIn.name,
              avatar: userIn.avatar,
              email: userIn.email,
            },
          }); // don't return password
        })
        .catch((e) => handleRequestError(res, e, "createUser"));
    })
    .catch((e) => handleRequestError(res, e, "createUser"));
};

module.exports.getUsers = (req, res) => {
  user // orFail not needed, is no data, ok with empty array
    .find({})
    // .then((users) => res.status(HTTP_STATUS.OK).send(users)) // // Status 200 is added by default: https://nodejs.org/en/guides/anatomy-of-an-http-transaction#http-status-code
    .then((users) => res.send(users))
    .catch((e) => handleRequestError(res, e, "getUsers"));
};

// module.exports.getUser = (req, res) => {
//   user
//     .findById(req.params.userId)
//     .orFail()
//     .then((userData) => res.send(userData))
//     .catch((e) => handleRequestError(res, e, "getUser"));
// };

module.exports.login = (req, res) => {
  console.log("Login");
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((userData) => {
      // console.log(userData);
      console.log("Print userData.name");
      console.log(userData.name);
      console.log("Print userData._id");
      console.log(userData._id);
      // authentication successful!
      const token = jwt.sign({ _id: userData._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token }); // return the token to client
    })
    .catch((e) => {
      // authentication error
      e.message = ERROR_MSG.unathorizedUser;
      handleRequestError(res, e, "login");
    });
};

module.exports.getCurrentUser = (req, res) => {
  console.log("--------------- getCurrentUser ---------------");
  // console.log(req);
  user
    .findById(req.user._id) // as a resul of "req.user = payload" in middleware
    .orFail()
    .then((userData) => {
      console.log("Found User");
      res.send(userData);
    })
    .catch((e) => {
      console.log("User not Found");
      e.message = ERROR_MSG.unknownUserId;
      handleRequestError(res, e, "getCurrentUser");
    });
};

module.exports.updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .findByIdAndUpdate(
      { __id: req.user_id },
      { name, avatar },
      {
        new: true, // then handler receives updated document
        runValidators: true, // validate data before update
      },
    )
    .orFail()
    .then((userData) => res.send(userData))
    .catch((e) => {
      if (e.name !== "ValidationError") e.message = ERROR_MSG.unknownUserId; // if not validation error, then user not found
      handleRequestError(res, e, "updateCurrentUser");
    });
};
