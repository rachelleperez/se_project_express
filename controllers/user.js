const user = require("../models/user");

const createUser = (req, res) => {
  // console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send({ message: "Error from getUsers", e }));
};

const getUser = (req, res) => {
  user
    .findById(itemId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send({ message: "Error from getUsers", e }));
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
