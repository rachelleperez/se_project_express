const router = require("express").Router();

const {
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

const { validateCreateClothingItem } = require("../middlewares/validation");

// CRUD

// Create
router.post("/", createClothingItem, validateCreateClothingItem);

// Read
// router.get("/", getClothingItems); // spec: do not protect with auth

// Update: Add like
router.put("/:itemId/likes", likeClothingItem);

// Delete - Clothing Item
router.delete("/:itemId", deleteClothingItem);

// Delete - Like
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
