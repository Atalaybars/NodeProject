const logger = require("../startup/logger");

module.exports.error = function (err, req, res, next) {
    logger.error(err);
    res.status(500).send("Ops! Something went wrong! Please try again later :)");
    next();
}