require("winston-daily-rotate-file");
var winston = require("winston");

var transport = new winston.transports.DailyRotateFile({
  filename: "./logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

var logger = winston.createLogger({
  transports: [transport],
});

module.exports = logger;
