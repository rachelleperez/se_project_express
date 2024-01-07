const clothingItem = require("../models/clothingItem");

const {
  ERROR_MSG,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors/index");

module.exports.createClothingItem = (req, res, next) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      // console.log(item);
      res.status(201).send(item);
    })
    .catch((err) => {
      // check for wrong id first
      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MSG.validation));
      } else {
        next(err);
      }
    });
};

module.exports.getClothingItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.send(items))
    .catch((err) => next(err));
};

module.exports.deleteClothingItem = (req, res, next) => {
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
    .catch((err) => {
      // check for wrong id first
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError(ERROR_MSG.validation));
      } else {
        next(err);
      }
    });
};

module.exports.likeClothingItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((e) => {
      // if user found, then validation error
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MSG.unknownItemId));
      } else {
        next(new BadRequestError(ERROR_MSG.validation));
      }
    });
};

module.exports.dislikeClothingItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true },
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((e) => {
      // if user found, then validation error
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MSG.unknownItemId));
      } else {
        next(new BadRequestError(ERROR_MSG.validation));
      }
    });
};
