const router = require("express").Router();

const { getUsers, getUser, login, createUser } = require("../controllers/user");

// CRUD

// Create
app.post("/signin", login);
app.post("/signup", createUser);

// Read
// router.get("/", getUsers);
// router.get("/:userId", getUser);
