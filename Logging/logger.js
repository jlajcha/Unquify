const {createLogger, format, transports} = require('winston');
const {Loggly} = require('winston-loggly-bulk');

const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss",
        }),
        format.errors({stack: true}),
        format.printf(data => `[${data.timestamp}] (${data.level}): ${data.message}`)
    ),
    defaultMeta:{ service: "UNQfy Logging"},
    transports: [
        new transports.File({ filename: `${__dirname}/logs/unqfy-errors.log`, level: "error"}),
        new transports.File({ filename: `${__dirname}/logs/unqfy-combined.log`, level: "debug"}),
        new Loggly({
            token: "04fbab1d-b04c-47c9-8010-5c5b3508f083",
            subdomain: "matotec",
            tags: ["Unqfy-Winston-NodeJS"],
            json: true
        })
    ],
});

module.exports = logger;