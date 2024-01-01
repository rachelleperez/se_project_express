const clothingItem = require("../models/clothingItem");
const { HTTP_STATUS, handleRequestError } = require("../utils/errors");

const {
  ERROR_MSG,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors/index");

module.exports.createClothingItem = (req, res) => {
  // console.log(arguments[0]);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(HTTP_STATUS.Created).send(item);
    })
    .catch((e) => handleRequestError(res, e));
};

module.exports.getClothingItems = (req, res) => {
  // console.log("Getting Clothing Items");
  clothingItem
    .find({})
    // .then((items) => res.status(HTTP_STATUS.OK).send(items)) // Status 200 is added by default: https://nodejs.org/en/guides/anatomy-of-an-http-transaction#http-status-code
    .then((items) => res.send(items))
    .catch((e) => handleRequestError(res, e));
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);
  clothingItem
    .findById(itemId)
    .orFail(new Error(ERROR_MSG.unknownItemId))
    // found Item
    .then((item) => {
      // If user requesting change, items's owner = user authorized to update items
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne().then(res.send(item));
      }
      // else, this user cannot update item
      return Promise.reject(new Error(ERROR_MSG.forbiddenRequest));
    })
    .catch((e) => handleRequestError(res, e));
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
    .catch((e) => handleRequestError(res, e));
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
    .catch((e) => handleRequestError(res, e));
};
