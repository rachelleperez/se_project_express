const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");

const { NotFoundError, ERROR_MSG } = require("../utils/errors/index");

// allows to send api calls to items and users.
router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res, next) => {
  next(new NotFoundError(ERROR_MSG.notFound));
});

module.exports = router;
