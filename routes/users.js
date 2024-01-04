const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateId } = require("../middlewares/validation");

// CRUD

// Create

// Read
router.get("/me", validateId, getCurrentUser);

// Update
router.patch("/me", validateId, updateCurrentUser);

module.exports = router;
