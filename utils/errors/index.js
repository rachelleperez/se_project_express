const BadRequestError = require("./BadRequestError");
const ConflictError = require("./ConflictError");
const ForbiddenError = require("./ForbiddenError");
const InternalServerError = require("./InternalServerError");
const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");

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
  validation: "Invalid Data",
  invalidID: "Invalid ID",
  internalServerError: "Internal Server Error",
  unexpectedError: "Unexpected Error",
};

module.exports = {
  ERROR_MSG,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
};
