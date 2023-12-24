const HTTP_STATUS = {
  OK: 200,
  Created: 201,
  NoContent: 204, // Accepted, no content sent back
  Accepted: 202,
  BadRequest: 400, // Invalid Data Passed
  Unathorized: 401,
  NotFound: 404, // Id passed not found
  Conflict: 409, // Email already in use
  InternalServerError: 500,
};

// Error Message(s)
const invalidEmailPasswordMessage = "Incorrect email or password";

// logs error and sends correct status and message
const handleRequestError = (res, err, srcError) => {
  console.error(err);
  if (err.name === "DocumentNotFoundError") {
    res.status(HTTP_STATUS.NotFound).send({ message: "ID not found" });
  } else if (err.name === "ValidationError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid data" });
  } else if (err.name === "CastError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid ID" });
  } else if (err.message === invalidEmailPasswordMessage) {
    res.status(HTTP_STATUS.Conflict).send({ message: err.message }); // Email already in use
  } else {
    res
      .status(HTTP_STATUS.InternalServerError)
      .send({ message: `Error from ${srcError}` });
  }
};

module.exports = {
  HTTP_STATUS,
  handleRequestError,
  invalidEmailPasswordMessage,
};
