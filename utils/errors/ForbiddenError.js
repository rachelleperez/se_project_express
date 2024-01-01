module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message || "Forbidden Request");
    this.status = 403;
    this.name = "ForbiddenError";
  }
};
