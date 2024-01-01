module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message || "Not Found");
    this.status = 404;
    this.name = "NotFoundError";
  }
};
