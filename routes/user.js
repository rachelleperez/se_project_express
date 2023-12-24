const router = require("express").Router();

// NOTE: protect all future routes with auth (only exceptions are signin, signup, and get items)

const { getCurrentUser } = require("../controllers/user");

// CRUD

// Create

// Read
router.get("/users/me", getCurrentUser);
// router.get("/", getUsers);
// router.get("/:userId", getUser);

module.exports = router;
