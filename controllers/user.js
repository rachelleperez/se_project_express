const user = require("../models/user");
const { HTTP_STATUS, handleRequestError } = require("../utils/errors");

module.exports.createUser = (req, res) => {
  console.log(req.body);

  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then(() => {
      console.log(user);
      res.status(HTTP_STATUS.Created).send({ data: user });
    })
    .catch((e) => handleRequestError(res, e, "createUser"));
};

module.exports.getUsers = (req, res) => {
  user // orFail not needed, is no data, ok with empty array
    .then((users) => res.status(HTTP_STATUS.OK).send(users))
    .catch((e) => handleRequestError(res, e, "getUsers"));
};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.itemId)
    .orFail()
    .then(() => res.status(HTTP_STATUS.OK).send(user))
    .catch((e) => handleRequestError(res, e, "getUser"));
};
