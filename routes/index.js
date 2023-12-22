const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");
const { HTTP_STATUS } = require("../utils/errors");

// allows to send api calls to items and users.
router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res
    .status(HTTP_STATUS.InternalServerError)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
