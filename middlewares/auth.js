const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const { ERROR_MSG, UnauthorizedError } = require("../utils/errors/index");

module.exports = (req, res, next) => {
  // get authorization from the header by destructuring
  const { authorization } = req.headers;

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(ERROR_MSG.authorizationRequired));
  }

  // auth header exists and is in correct format
  // so extract the token from the header
  const token = authorization.replace("Bearer ", "");

  // if token is verified, save the payload
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MSG.authorizationRequired));
  }

  /* Save payload to request. This makes the payload available
     to the latter parts of the route. See the `Accessing user
     data with req.user` example for details. */

  req.user = payload;

  // sending the request to the next middleware
  return next();
};
