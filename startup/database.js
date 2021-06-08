const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function() {
    mongoose.connect("mongodb://localhost/AwesomePlayground",{
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