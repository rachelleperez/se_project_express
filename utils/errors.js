// potential HTTP status options
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
  invalidEmail: "Invalid Email",
  existingEmail: "Email already in use",
  invalidPassword: "Incorrect password",
  unathorizedUser: "Unathorized User",
  authorizationRequired: "Authorization Required",
  unknownUserId: "Unknown User Id",
  unknownItemId: "Unknown Item Id",
  unknownId: "Unknown Id",
  forbiddenRequest: "Unathorized Request",
  debug: "Debugging Error",
  badRequest: "Bad Request",
  validation: "Invalid Data",
  invalidID: "Invalid ID",
  internalServerError: "Internal Server Error",
};

const errorStatusMap = {
  [ERROR_MSG.validation]: HTTP_STATUS.BadRequest,
  [ERROR_MSG.unathorizedUser]: HTTP_STATUS.Unathorized,
  [ERROR_MSG.invalidEmail]: HTTP_STATUS.Unathorized,
  [ERROR_MSG.invalidPassword]: HTTP_STATUS.Unathorized,
  [ERROR_MSG.authorizationRequired]: HTTP_STATUS.Unathorized,
  [ERROR_MSG.unknownUserId]: HTTP_STATUS.NotFound,
  [ERROR_MSG.unknownId]: HTTP_STATUS.NotFound,
  [ERROR_MSG.unknownItemId]: HTTP_STATUS.NotFound,
  [ERROR_MSG.forbiddenRequest]: HTTP_STATUS.Forbidden,
  [ERROR_MSG.badRequest]: HTTP_STATUS.BadRequest,
  [ERROR_MSG.existingEmail]: HTTP_STATUS.Conflict,
  [ERROR_MSG.invalidID]: HTTP_STATUS.BadRequest,
  [ERROR_MSG.internalServerError]: HTTP_STATUS.InternalServerError,
};

// logs error and sends correct status and message
const handleRequestError = (res, errIn) => {
  // copied to be able to override message
  const err = errIn;

  // update messages for standard ones
  if (err.name === "ValidationError") {
    err.message = ERROR_MSG.validation;
  } else if (err.name === "DocumentNotFoundError") {
    err.message = ERROR_MSG.unknownId;
  } else if (err.name === "CastError") {
    err.message = ERROR_MSG.invalidID;
  }

  // If error mapped, use mapping
  if (Object.keys(errorStatusMap).includes(err.message)) {
    res.status(errorStatusMap[err.message]).send({ message: err.message });
  }
  // default: Internal Server Error
  else {
    res
      .status(errorStatusMap[ERROR_MSG.internalServerError])
      .send({ message: ERROR_MSG.internalServerError });
  }

  // // handle errors based on custom error messages
  // if (err.message === ERROR_MSG.debug) {
  //   res.status(HTTP_STATUS.ServiceUnavailable).send({ message: err.message }); // Testing stage
  // }
  // // handle default error messages
  // else if (err.message === ERROR_MSG.validation) {
  //   res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid Data" });
  // } else if (err.message === ERROR_MSG.unathorizedUser) {
  //   res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // User failed authentication
  // } else if (err.message === ERROR_MSG.invalidEmail) {
  //   res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // Email already in use
  // } else if (err.message === ERROR_MSG.invalidPassword) {
  //   res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // Email already in use
  // } else if (err.message === ERROR_MSG.authorizationRequired) {
  //   res.status(HTTP_STATUS.Unathorized).send({ message: err.message }); // User failed authentication
  // } else if (err.message === ERROR_MSG.unknownUserId) {
  //   res.status(HTTP_STATUS.NotFound).send({ message: err.message });
  // } else if (err.message === ERROR_MSG.unknownId) {
  //   res.status(HTTP_STATUS.NotFound).send({ message: err.message });
  // } else if (err.message === ERROR_MSG.unknownItemId) {
  //   res.status(HTTP_STATUS.NotFound).send({ message: err.message });
  // } else if (err.message === ERROR_MSG.forbiddenRequest) {
  //   res.status(HTTP_STATUS.Forbidden).send({ message: err.message });
  // } else if (err.message === ERROR_MSG.badRequest) {
  //   res.status(HTTP_STATUS.BadRequest).send({ message: err.message });
  // } else if (err.message === ERROR_MSG.existingEmail) {
  //   res.status(HTTP_STATUS.Conflict).send({ message: err.message });
  // } else if (err.message === ERROR_MSG.invalidID) {
  //   res.status(HTTP_STATUS.BadRequest).send({ message: err.message });
  // }

  // // default: 500
  // else {
  //   res
  //     .status(HTTP_STATUS.InternalServerError)
  //     .send({ message: `Error from ${srcError}` });
  // }
};

module.exports = {
  HTTP_STATUS,
  handleRequestError,
  ERROR_MSG,
};
