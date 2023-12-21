const router = require("express").Router();
const clothingItem = require("./clothingItem");

// allows to send api calls to items.
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
