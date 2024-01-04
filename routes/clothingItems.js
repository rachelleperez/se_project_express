const router = require("express").Router();

const {
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

const {
  validateCreateClothingItem,
  validateId,
} = require("../middlewares/validation");

// CRUD

// Create
router.post("/", validateCreateClothingItem, createClothingItem);

// Read
// router.get("/", getClothingItems); // spec: do not protect with auth

// Update: Add like
router.put("/:itemId/likes", validateId, likeClothingItem);

// Delete - Clothing Item
router.delete("/:itemId", validateId, deleteClothingItem);

// Delete - Like
router.delete("/:itemId/likes", validateId, dislikeClothingItem);

module.exports = router;
