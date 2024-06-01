const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const employeeController = require("../controllers/employeeControllers");

// Create a new employee
router.post("/", verifyToken, employeeController.createEmployee);

// Get all employees
router.get("/", verifyToken, employeeController.getAllEmployees);

// Get an employee by ID
router.get("/:id", verifyToken, employeeController.getEmployeeById);

// Update an employee by ID
router.put("/:id", verifyToken, employeeController.updateEmployee);

// Delete an employee by ID
router.delete("/:id", verifyToken, employeeController.deleteEmployee);

module.exports = router;
