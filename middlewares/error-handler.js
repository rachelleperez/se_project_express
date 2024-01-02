const {
  ERROR_MSG,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors/index");

module.exports = function errorHandler(errIn, req, res, next) {
  // variable to choose appropriate error to use
  let err = null;

  // if standard error with vague, use appropriate custom Error object
  if (err.name === "ValidationError") {
    err = new BadRequestError(ERROR_MSG.validation);
  } else if (err.name === "DocumentNotFoundError") {
    err = new NotFoundError(ERROR_MSG.unknownId);
  } else if (err.name === "CastError") {
    err = new BadRequestError(ERROR_MSG.invalidID);
  }
  // otherwise, just keep existing error as is
  else {
    err = errIn;
  }

  // console.error all errors
  console.error(err.message);

  if (err instanceof Error) {
    return res
      .status(err.status || 500)
      .send({ name: err.name, message: err.message });
  }

  // default behavior, just in case
  return res.status(500).send({
    name: "InternalServerError",
    message: "Unexpected Server Error",
  });
};
