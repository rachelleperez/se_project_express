const router = require("express").Router();

const {
  createClothingItem,
  getClothingItems,
  // updateItem,
  deleteClothingItem,
} = require("../controllers/clothingItem");

//CRUD

//Create
router.post("/", createClothingItem);

// Read
router.get("/", getClothingItems);

// Update
// router.put("/:itemId", updateItem);

// Delete
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
