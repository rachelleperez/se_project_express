const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");
const auth = require("../middlewares/auth");

const { HTTP_STATUS } = require("../utils/errors");

// allows to send api calls to items and users.
router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use((req, res) => {
  res
    .status(HTTP_STATUS.NotFound) // A middleware for handling an unknown route should return the 404 status code.
    .send({ message: "Requested resource not found" });
});

module.exports = router;
