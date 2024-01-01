module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message || "Unathorized Request");
    this.status = 401;
    this.name = "UnathorizedError";
  }
};
