const clothingItem = require("../models/clothingItem");

const {
  ERROR_MSG,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors/index");

module.exports.createClothingItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(201).send(item);
    })
    .catch((err) => next(err));
};

module.exports.getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.send(items))
    .catch((err) => next(err));
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail(new NotFoundError(ERROR_MSG.unknownItemId))
    // found Item
    .then((item) => {
      // If user requesting change, items's owner = user authorized to update items
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne().then(res.send(item));
      }
      // else, this user cannot update item
      throw new ForbiddenError(ERROR_MSG.forbiddenRequest);
    })
    .catch((err) => next(err));
};

module.exports.likeClothingItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => next(err));
};

module.exports.dislikeClothingItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true },
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => next(err));
};
