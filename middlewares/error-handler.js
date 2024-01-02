const {
  ERROR_MSG,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors/index");

module.exports = function errorHandler(err, req, res, next) {
  console.log("Error received by errorHandler", err);

  // // if standard error (not instances of error), use appropriate custom Error object
  // if (err.name === "ValidationError") {
  //   err = new BadRequestError(ERROR_MSG.validation);
  // } else if ((!err) instanceof Error && err.name === "DocumentNotFoundError") {
  //   err = new NotFoundError(ERROR_MSG.unknownId);
  // } else if ((!err) instanceof Error && err.name === "CastError") {
  //   err = new BadRequestError(ERROR_MSG.invalidID);
  // }

  if (err instanceof Error) {
    console.error(err.message);
    return res
      .status(err.status)
      .send({ name: err.name, message: err.message });
  } else {
    newErr = new InternalServerError(ERROR_MSG.unexpectedError);
    console.error(newErr.message);
    return res
      .status(newErr.status)
      .send({ name: newErr.name, message: newErr.message });
  }
};
