const clothingItem = require("../models/clothingItem");
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  // console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => res.status(500).send({ message: "Error from getItems", e }));
};

const updateItem = (req, res) => {
  const { itemId } = req.params; // part of URL
  const { imageURL } = req.body;
  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail() // throws error if not found. else return null and goes into then()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: "Error from updateItem", e }),
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({})) // 204 = completed
    .catch((e) =>
      res.status(500).send({ message: "Error from deleteItem", e }),
    );
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
