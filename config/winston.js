const winston = require('winston');
require('winston-daily-rotate-file');

let fileLog = new (winston.transports.DailyRotateFile)({
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

let consoleDebug = new winston.transports.Console();

module.exports = {
    transports: [
        consoleDebug,
        fileLog
    ]
};