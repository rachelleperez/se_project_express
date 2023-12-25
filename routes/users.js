const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// CRUD

// Create

// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", updateCurrentUser);

module.exports = router;
