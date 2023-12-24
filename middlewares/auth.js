const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { HTTP_STATUS, ERROR_MSG } = require("../utils/errors");

module.exports = (req, res, next) => {
  // get authorization from the header by destructuring
  const { authorization } = req.headers;

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(HTTP_STATUS.Unathorized)
      .send({ message: ERROR_MSG.authorizationRequired });
  }

  // auth header exists and is in correct format
  // so extract the token from the header
  const token = authorization.replace("Bearer ", "");

  // if token is verified, save the payload
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // otherwise, return an error
    return res
      .status(HTTP_STATUS.Unathorized)
      .send({ message: ERROR_MSG.authorizationRequired });
  }

  /* Save payload to request. This makes the payload available
     to the latter parts of the route. See the `Accessing user
     data with req.user` example for details. */
  req.user = payload;

  // sending the request to the next middleware
  return next();
};
