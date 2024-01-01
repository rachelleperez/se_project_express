module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message || "Data Conflict");
    this.status = 409;
    this.name = "ConflictError";
  }
};
