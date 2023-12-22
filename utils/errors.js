const HTTP_STATUS = {
  OK: 200,
  Created: 201,
  NoContent: 204, // Accepted, no content sent back
  Accepted: 202,
  BadRequest: 400, // Invalid Data Passed
  NotFound: 404, // Id passed not found
  InternalServerError: 500,
};

// in: error and function name where error came from
const handleRequestError = (res, err, srcError) => {
  console.error(err);
  if (err.name === "DocumentNotFoundError") {
    res.status(HTTP_STATUS.NotFound).send({ message: "ID not found", err });
  } else {
    res
      .status(HTTP_STATUS.InternalServerError)
      .send({ message: `Error from ${srcError}`, err });
  }
};

module.exports = {
  HTTP_STATUS,
  handleRequestError,
};
