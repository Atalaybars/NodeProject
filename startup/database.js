const config = require("config");
const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function() {
    mongoose.connect(config.get("db"),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    const db = mongoose.connection;
    db.once('open', () => {
        // we're connected!
        logger.info("connected to the database! :)")
    });
}