module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message || "Invalid Data");
    this.status = 400;
    this.name = "BadRequestError";
  }
};
