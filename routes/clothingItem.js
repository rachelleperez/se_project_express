const router = require("express").Router();

const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", createClothingItem);

// Read
router.get("/", getClothingItems);

// Update
// router.put("/:itemId", updateItem);

// Update: Add like
router.put("/:itemId/likes", likeClothingItem);

// Delete - Clothing Item
router.delete("/:itemId", deleteClothingItem);

// Delete - Like
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
