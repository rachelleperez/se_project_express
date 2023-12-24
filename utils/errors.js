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

// in: error and function name where error came from
const handleRequestError = (res, err, srcError) => {
  console.error(err);
  if (err.name === "DocumentNotFoundError") {
    res.status(HTTP_STATUS.NotFound).send({ message: "ID not found" });
  } else if (err.name === "ValidationError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid data" });
  } else if (err.name === "CastError") {
    res.status(HTTP_STATUS.BadRequest).send({ message: "Invalid ID" });
  } else {
    res
      .status(HTTP_STATUS.InternalServerError)
      .send({ message: `Error from ${srcError}` });
  }
};

module.exports = {
  HTTP_STATUS,
  handleRequestError,
};
