const log4js = require("log4js");

log4js.configure({
    appenders: {
        logConsola: { type: "console" },
        logWarning: { type: "file", filename: "warn.log" },
        logError: { type: "file", filename: "error.log" },

        loggerConsola: {
            type: "logLevelFilter", appender: "logConsola", level: "info",
        },
        loggerWarning: {
            type: "logLevelFilter", appender: "logWarning", level: "warn",
        },
        loggerError: {
            type: "logLevelFilter",  appender: "logError", level: "error",
        },
    },
    categories: {
        default: { appenders: ["loggerConsola"], level: "all" },
        custom: {
            appenders: ["loggerConsola", "loggerWarning", "loggerError"],
            level: "all",
        },
    },
});

module.exports = log4js;