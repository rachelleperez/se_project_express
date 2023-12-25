const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// CRUD

// Create

// Read
router.get("/me", auth, getCurrentUser);

// Update
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
