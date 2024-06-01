const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Login = sequelize.define(
  "Login",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login",
    timestamps: false, // Disable timestamps as they are managed by the migration
  }
);

module.exports = Login;
