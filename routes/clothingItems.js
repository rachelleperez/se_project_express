const router = require("express").Router();

const {
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

const {
  validateCreateClothingItem,
  validateItemId,
} = require("../middlewares/validation");

// CRUD

// Create
router.post("/", validateCreateClothingItem, createClothingItem);

// Read
// router.get("/", getClothingItems); // spec: do not protect with auth

// Update: Add like
router.put("/:itemId/likes", validateItemId, likeClothingItem);

// Delete - Clothing Item
router.delete("/:itemId", validateItemId, deleteClothingItem);

// Delete - Like
router.delete("/:itemId/likes", validateItemId, dislikeClothingItem);

module.exports = router;
