const app = require("./index");
const logger = require("./config/logger");
const { sequelize } = require("./config/database");

const PORT = 3000;

// Database connection
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connected to the database");
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });
