const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// CRUD

// Create

// Read
router.get("/users/me", auth, getCurrentUser);

// Update
router.patch("users/me", auth, updateCurrentUser);

module.exports = router;
