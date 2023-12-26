const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { HTTP_STATUS, ERROR_MSG } = require("../utils/errors");

module.exports = (req, res, next) => {
  console.log("------------- Middlewares - Auth --------------");
  // get authorization from the header by destructuring
  const { authorization } = req.headers;
  console.log("Print authorization");
  console.log(authorization);

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(HTTP_STATUS.Unathorized)
      .send({ message: ERROR_MSG.authorizationRequired });
  }

  // auth header exists and is in correct format
  // so extract the token from the header
  const token = authorization.replace("Bearer ", "");

  console.log("Print token");
  console.log(token);

  // if token is verified, save the payload
  let payload;
  try {
    console.log("Token verified");
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log("Token verification error");
    // otherwise, return an error
    return res
      .status(HTTP_STATUS.Unathorized)
      .send({ message: ERROR_MSG.authorizationRequired });
  }

  /* Save payload to request. This makes the payload available
     to the latter parts of the route. See the `Accessing user
     data with req.user` example for details. */

  console.log("Print payload");
  console.log(payload);
  req.user = payload;

  console.log("Print req.user");
  console.log(req.user);

  // sending the request to the next middleware
  return next();
};
