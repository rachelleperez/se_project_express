module.exports = class InternalServerError extends Error {
  constructor(message) {
    super(message || "Internal Server Error");
    this.status = 500;
    this.name = "InternalServerError";
  }
};
