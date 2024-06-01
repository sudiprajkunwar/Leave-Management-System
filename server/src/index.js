require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
