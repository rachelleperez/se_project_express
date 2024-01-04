const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUserId } = require("../middlewares/validation");
// CRUD

// Create

// Read
router.get("/me", validateUserId, getCurrentUser);

// Update
router.patch("/me", validateUserId, updateCurrentUser);

module.exports = router;
