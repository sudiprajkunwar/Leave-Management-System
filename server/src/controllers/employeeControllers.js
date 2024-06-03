const logger = require("../config/logger");
const Employee = require("../models/employee.model");

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    logger.info("Employee created", { employee });
    res.status(201).json(employee);
  } catch (error) {
    logger.error("Error creating employee", { error: error.message });
    res.status(400).json({ message: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    logger.info("Fetched all employees");
    res.status(200).json(employees);
  } catch (error) {
    logger.error("Error fetching employees", { error: error.message });
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (employee) {
      logger.info("Fetched employee", { id });
      res.status(200).json(employee);
    } else {
      logger.warn("Employee not found", { id });
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    logger.error("Error fetching employee", { error: error.message });
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.update(req.body);
      logger.info("Employee updated", { id, employee });
      res.status(200).json(employee);
    } else {
      logger.warn("Employee not found", { id });
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    logger.error("Error updating employee", { error: error.message });
    res.status(500).json({ message: "Error updating employee", error });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.destroy();
      logger.info("Employee deleted", { id });
      res
        .status(200)
        .json({ message: "Employee successfully deleted", employee });
    } else {
      logger.warn("Employee not found", { id });
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    logger.error("Error deleting employee", { error: error.message });
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
