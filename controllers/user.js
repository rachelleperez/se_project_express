const user = require("../models/user");
const { HTTP_STATUS, handleRequestError } = require("../utils/errors");

module.exports.createUser = (req, res) => {
  console.log(req.body);

  const { name, avatar, email, password } = req.body;

  user
    .create({ name, avatar, email, password })
    .then((userData) => {
      res.status(HTTP_STATUS.Created).send({ data: userData });
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
