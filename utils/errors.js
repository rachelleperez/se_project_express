const HTTP_STATUS = {
  OK: 200, // request suceeded, default response status | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
  Created: 201, // Creation of a resource | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  BadRequest: 400, // Invalid Data Passed | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
  Unathorized: 401, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
  NotFound: 404, // Id passed not found | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
  Conflict: 409, // Conflict with currrent statue of resource | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
  InternalServerError: 500, // Internal Server Error, default error | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
};

// error messages declared once here
const ERROR_MSG = {
  invalidEmailPassword: "Incorrect email or password",
  unathorizedUser: "Unathorized User",
  authorizationRequired: "Authorization Required",
};

// logs error and sends correct status and message
const handleRequestError = (res, err, srcError) => {
  console.error(err);
  if (err.name === "DocumentNotFoundError") {
    res.status(HTTP_STATUS.NotFound).send({ message: "ID not found" });
  } else if (err.name === "ValidationError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid data" });
  } else if (err.name === "CastError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid ID" });
  } else if (err.message === ERROR_MSG.invalidEmailPassword) {
    res.status(HTTP_STATUS.Conflict).send({ message: err.message }); // Email already in use
  } else if (err.message === ERROR_MSG.unathorizedUser) {
    res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // User failed authentication
  } else if (err.message === ERROR_MSG.authorizationRequired) {
    res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // User failed authentication
  } else {
    res
      .status(HTTP_STATUS.InternalServerError)
      .send({ message: `Error from ${srcError}` });
  }
};

module.exports = {
  HTTP_STATUS,
  handleRequestError,
  ERROR_MSG,
};
