// // index.js
// const express = require("express");
// const { sequelize } = require("./config/database");
// // const bodyParser = require("body-parser");

// const PORT = 3000;
// const app = express();

// // Import routes
// const authRoutes = require("./routes/authRoutes");
// const employeeRoutes = require("./routes/employeesRoutes");
// // const leaveRoutes = require("./routes/leaveRoutes");
// // const reportRoutes = require("./routes/reportRoutes");

// // app.use(bodyParser.json());

// // Use routes
// app.use("/auth", authRoutes);
// app.use("/employees", employeeRoutes);
// // app.use("/leave", leaveRoutes);
// // app.use("/report", reportRoutes);
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
// GET method route
app.get("/", (req, res) => {
  res.send("GET request to the a");
});

app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);

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
