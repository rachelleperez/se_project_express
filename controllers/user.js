const user = require("../models/user");

module.exports.createUser = (req, res) => {
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

module.exports.getUsers = (req, res) => {
  user
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send({ message: "Error from getUser", e }));
};

module.exports.getUser = (req, res) => {
  user
    .findById(itemId)
    .orFail(() => {
      const error = new Error("ID not found");
      error.statusCode = 400; // Bad Request
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.statusCode === 400) {
        res.send({ message: e.message });
      }
      res.status(500).send({ message: "Error from getUsers", e });
    });
};

// module.exports = {
//   getUser,
//   getUsers,
//   createUser,
// };
