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
    // .then((items) => res.status(HTTP_STATUS.OK).send(items)) // Status 200 is added by default: https://nodejs.org/en/guides/anatomy-of-an-http-transaction#http-status-code
    .then((items) => res.send(items))
    .catch((e) => handleRequestError(res, e, "getClothingItems"));
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send({ data: item }))
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
    .then((item) => res.send({ data: item }))
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
    .then((item) => res.send({ data: item }))
    .catch((e) => handleRequestError(res, e, "dislikeClothingItem"));
};

module.exports.updateCurrentUser = (req, res) => {};

/*
This route should only allow modification of the name and avatar fields. 
You'll need to return an updated object in the response (using the new property). 
Don't forget to handle Not Found, Validation, and default server errors for these routes.

Mongoose has validators for update methods that help avoid incorrect values being set. 
You can refer to the documentation for information on how to enable validators.

*/
