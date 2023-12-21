const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");

// allows to send api calls to items and users.
router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
