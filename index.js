const logger = require("./startup/logger");
const express = require("express");
const app = express();

require("./startup/database")();
require("./startup/configuration")();
require("./startup/validation")();
require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => logger.info(`listening on port ${port}`));