const router = require("express").Router();

const { getUsers, getUser, createUser } = require("../controllers/user");

//CRUD

//Create
router.post("/", createUser);

// Read
router.get("/", getUsers);
router.get("/:itemId", getUser);

module.exports = router;
