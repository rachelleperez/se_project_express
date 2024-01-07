const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUpdateCurrentUser } = require("../middlewares/validation");

// CRUD

// Create

// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", validateUpdateCurrentUser, updateCurrentUser);

module.exports = router;
