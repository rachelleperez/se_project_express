const clothingItem = require("../models/clothingItem");

module.exports.createClothingItem = (req, res) => {
  console.log("reached createClothingItem");
  // console.log(req);
  console.log(req.body);
  console.log(req.user);
  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createClothingItem", e });
    });
};

module.exports.getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) =>
      res.status(500).send({ message: "Error from getClothingItems", e }),
    );
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 400; // Bad Request
      throw error;
    })
    .then((item) => res.status(204).send({})) // 204 = completed
    .catch((e) => {
      if (e.statusCode === 400) {
        res.send({ message: e.message });
      }
      res.status(500).send({ message: "Error from deleteClothingItem", e });
    });
};

module.exports.likeClothingItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 400; // Bad Request
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.statusCode === 400) {
        res.send({ message: e.message });
      }
      res.status(500).send({ message: "Error from deleteClothingItem", e });
    });
};

module.exports.dislikeClothingItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true },
    )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 400; // Bad Request
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.statusCode === 400) {
        res.send({ message: e.message });
      }
      res.status(500).send({ message: "Error from deleteClothingItem", e });
    });
};

// module.exports.updateItem = (req, res) => {
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
//       res.status(500).send({ message: "Error from deleteClothingItem", e });
//     });
// };
