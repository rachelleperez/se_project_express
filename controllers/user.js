const user = require("../models/user");
const bcrypt = require("bcrypt"); // importing bcrypt
const {
  HTTP_STATUS,
  handleRequestError,
  invalidEmailPasswordMessage,
} = require("../utils/errors");

module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, avatar, email } = req.body;

  user
    .findOne({ email })
    .then((userData) => {
      // if email found
      if (userData) {
        return Promise.reject(new Error(invalidEmailPasswordMessage));
      }
      // else, new email
      return bcrypt
        .hash(req.body.password, 10) // dont extract password until needed
        .then((hash) => user.create({ name, avatar, email, password: hash }))
        .then((userData) => {
          res.status(HTTP_STATUS.Created).send({
            data: {
              name: userData.name,
              avatar: userData.avatar,
              email: userData.email,
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

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.userId)
    .orFail()
    .then((userData) => res.send(userData))
    .catch((e) => handleRequestError(res, e, "getUser"));
};
