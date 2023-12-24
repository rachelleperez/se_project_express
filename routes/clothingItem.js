const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", auth, createClothingItem);

// Read
router.get("/", getClothingItems); // spec: do not protect with auth

// Update: Add like
router.put("/:itemId/likes", auth, likeClothingItem);

// Delete - Clothing Item
router.delete("/:itemId", auth, deleteClothingItem);

// Delete - Like
router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
