// src/config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "admin",
  database: "lms",
});

module.exports = { sequelize };
