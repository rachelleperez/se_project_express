const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
// const { validateUserId } = require("../middlewares/validation");
// CRUD

// Create

// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", updateCurrentUser);

module.exports = router;
