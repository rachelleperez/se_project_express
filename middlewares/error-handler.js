const {
  ERROR_MSG,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors/index");

module.exports = function errorHandler(errIn, req, res, next) {
  console.log("Error received by errorHandler", errIn);
  // console.log(errIn instanceof Error);
  // console.log(errIn.constructor !== Error);

  // variable to choose appropriate error to use
  let err = null;

  // if standard error (not instances of error), use appropriate custom Error object
  if ((!errIn) instanceof Error && errIn.name === "ValidationError") {
    err = new BadRequestError(ERROR_MSG.validation);
  } else if (
    (!errIn) instanceof Error &&
    errIn.name === "DocumentNotFoundError"
  ) {
    err = new NotFoundError(ERROR_MSG.unknownId);
  } else if ((!errIn) instanceof Error && errIn.name === "CastError") {
    err = new BadRequestError(ERROR_MSG.invalidID);
  }
  // custom Error objects set in utils.error (object is an Error but not specifically "Error")
  else if (errIn instanceof Error && errIn.constructor !== Error) {
    err = errIn;
  }
  // default
  else {
    err = new InternalServerError(ERROR_MSG.internalServerError);
  }

  // console.error all errors
  console.error(err.message);

  return res.status(err.status).send({ name: err.name, message: err.message });
};
