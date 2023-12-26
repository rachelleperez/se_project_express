const HTTP_STATUS = {
  OK: 200, // request suceeded, default response status | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
  Created: 201, // Creation of a resource | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  BadRequest: 400, // Invalid Data Passed | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
  Unathorized: 401, // https//developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
  Forbidden: 403, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
  NotFound: 404, // Id passed not found | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
  Conflict: 409, // Conflict with currrent statue of resource | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
  InternalServerError: 500, // Internal Server Error, default error | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
  ServiceUnavailable: 503, // Service Unavailable, to be used for testing | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503
};

// error messages declared once here
const ERROR_MSG = {
  invalidEmail: "Email already in use",
  invalidPassword: "Incorrect password",
  unathorizedUser: "Unathorized User",
  authorizationRequired: "Authorization Required",
  unknownUserId: "Unknown User Id",
  unknownItemId: "Unknown Item Id",
  forbiddenRequest: "Unathorized Request",
  debug: "Debugging Error",
  badRequest: "Invalid Data",
};

// logs error and sends correct status and message
const handleRequestError = (res, err, srcError) => {
  console.error(err);

  // handle errors based on custom error messages
  if (err.message === ERROR_MSG.debug) {
    res.status(HTTP_STATUS.ServiceUnavailable).send({ message: err.message }); // Testing stage
  }
  // handle default error messages
  else if (err.name === "DocumentNotFoundError") {
    res.status(HTTP_STATUS.NotFound).send({ message: "ID not found" });
  } else if (err.name === "ValidationError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid data" });
  } else if (err.name === "CastError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid ID" });
  } else if (err.message === ERROR_MSG.unathorizedUser) {
    res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // User failed authentication
  } else if (err.message === ERROR_MSG.invalidEmail) {
    res.status(HTTP_STATUS.Conflict).send({ message: err.message }); // Email already in use
  } else if (err.message === ERROR_MSG.invalidPassword) {
    res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // Email already in use
  } else if (err.message === ERROR_MSG.authorizationRequired) {
    res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // User failed authentication
  } else if (err.message === ERROR_MSG.unknownUserId) {
    res.status(HTTP_STATUS.NotFound).send({ message: err.message });
  } else if (err.message === ERROR_MSG.unknownItemId) {
    res.status(HTTP_STATUS.NotFound).send({ message: err.message });
  } else if (err.message === ERROR_MSG.forbiddenRequest) {
    res.status(HTTP_STATUS.Forbidden).send({ message: err.message });
  } else if (err.message === ERROR_MSG.badRequest) {
    res.status(HTTP_STATUS.BadRequest).send({ message: err.message });
  }

  // default: 500
  else {
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
