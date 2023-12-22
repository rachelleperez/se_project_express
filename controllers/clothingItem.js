const clothingItem = require("../models/clothingItem");
const { HTTP_STATUS, handleRequestError } = require("../utils/errors");

module.exports.createClothingItem = (req, res) => {
  // console.log(arguments[0]);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(HTTP_STATUS.Created).send({ data: item });
    })
    .catch((e) => handleRequestError(res, e, "createClothingItem"));
};

module.exports.getClothingItems = (req, res) => {
  // console.log("Getting Clothing Items");
  clothingItem
    .find({})
    .then((items) => res.status(HTTP_STATUS.OK).send(items))
    .catch((e) => handleRequestError(res, e, "getClothingItems"));
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send({ data: item }))
    .catch((e) => handleRequestError(res, e, "deleteClothingItem"));
};

module.exports.likeClothingItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    )
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send({ data: item }))
    .catch((e) => handleRequestError(res, e, "likeClothingItem"));
};

module.exports.dislikeClothingItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true },
    )
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send({ data: item }))
    .catch((e) => handleRequestError(res, e, "dislikeClothingItem"));
};

// module.exports.updateItem = (req, res) => {
//   const { itemId } = req.params; // part of URL
//   const { imageUrl } = req.body;
//   clothingItem
//     .findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail(() => {
//       const error = new Error("ID not found");
//       error.statusCode = 404; // Bad Request
//       throw error;
//     })
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       if (e.statusCode === 404) {
//         res.send({ message: e.message });
//       }
//       res.status(500).send({ message: "Error from deleteClothingItem", e });
//     });
// };
