const clothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  // console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => res.status(500).send({ message: "Error from getItems", e }));
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params; // part of URL
//   const { imageURL } = req.body;
//   clothingItem
//     .findByIdAndUpdate(itemId, { $set: { imageURL } })
//     .orFail(() => {
//       const error = new Error("ID not found");
//       error.statusCode = 400; // Bad Request
//       throw error;
//     })
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       if (e.statusCode === 400) {
//         res.send({ message: e.message });
//       }
//       res.status(500).send({ message: "Error from deleteItem", e });
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("ID not found");
      error.statusCode = 400; // Bad Request
      throw error;
    })
    .then((item) => res.status(204).send({})) // 204 = completed
    .catch((e) => {
      if (e.statusCode === 400) {
        res.send({ message: e.message });
      }
      res.status(500).send({ message: "Error from deleteItem", e });
    });
};

module.exports = {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
};
