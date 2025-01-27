const winston = require("winston");
const expressWinston = require("express-winston");

// customize how logs are formatted when shown in console.log(0)
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`,
  ),
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      // For console logs we use our relatively concise messageFormat
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      // For file logs we use the more verbose json format
      format: winston.format.json(),
    }),
  ],
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
