const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");

const { HTTP_STATUS } = require("../utils/errors");

const { NotFoundError } = require("../utils/errors/index");

// allows to send api calls to items and users.
router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res
    .status(HTTP_STATUS.NotFound) // A middleware for handling an unknown route should return the 404 status code.
    .send({ message: "Requested resource not found" });
});

module.exports = router;
