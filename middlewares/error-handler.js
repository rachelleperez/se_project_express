const {
  ERROR_MSG,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors/index");

module.exports = function errorHandler(errIn, req, res, next) {
  console.log("Error received by errorHandler", errIn);

  // variable to choose appropriate error to use
  let err = null;

  // if standard error (not instances of error), use appropriate custom Error object
  if ((!err) instanceof Error && err.name === "ValidationError") {
    err = new BadRequestError(ERROR_MSG.validation);
  } else if ((!err) instanceof Error && err.name === "DocumentNotFoundError") {
    err = new NotFoundError(ERROR_MSG.unknownId);
  } else if ((!err) instanceof Error && err.name === "CastError") {
    err = new BadRequestError(ERROR_MSG.invalidID);
  }
  // custom Error objects set in utils.error (object is an Error but not specifically "Error")
  else if (err instanceof Error && !err.constructor === Error) {
    err = errIn;
  }
  // default
  else {
    err = new InternalServerError(ERROR_MSG.internalServerError);
  }

  // console.error all errors
  console.error(err.message);

  return res
    .status(err.status || 500)
    .send({ name: err.name, message: err.message });
};
