const { ERROR_MSG, InternalServerError } = require("../utils/errors/index");

module.exports = function errorHandler(errIn, req, res, next) {
  console.log("Error received by errorHandler", errIn);

  // set default behavior
  let err = errIn;
  if ((!err) instanceof Error) {
    err = new InternalServerError(ERROR_MSG.unexpectedError);
  }

  // console error, all errors
  console.error(err.message);

  return res.status(err.status).send({ name: err.name, message: err.message });
};
