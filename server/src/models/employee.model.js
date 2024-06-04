const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    designation: {
      type: DataTypes.ENUM(
        "Manager",
        "Assistant Manager",
        "Engineer",
        "Associate",
        "Principal"
      ),
    },
    department: {
      type: DataTypes.ENUM(
        "HR",
        "Finance",
        "Engineering",
        "Sales",
        "Marketing"
      ),
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;
