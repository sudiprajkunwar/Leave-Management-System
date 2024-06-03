const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const employeeController = require("../controllers/employeeControllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - designation
 *         - department
 *         - country_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the employee
 *         first_name:
 *           type: string
 *           description: The first name of the employee
 *         last_name:
 *           type: string
 *           description: The last name of the employee
 *         email:
 *           type: string
 *           description: The email of the employee
 *         designation:
 *           type: string
 *           description: The designation of the employee
 *         department:
 *           type: string
 *           description: The department of the employee
 *         country_id:
 *           type: integer
 *           description: The country id of the employee
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the employee was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the employee was last updated
 *       example:
 *         first_name: John
 *         last_name: Doe
 *         email: john.doe@example.com
 *         designation: Engineer
 *         department: Engineering
 *         country_id: 1
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: The employees managing API
 */

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: The employee was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request
 */
router.post("/", verifyToken, employeeController.createEmployee);

/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Returns the list of all the employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", verifyToken, employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get the employee by id
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: The employee was not found
 */
router.get("/:id", verifyToken, employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The employee was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: The employee was not found
 *       500:
 *         description: Error updating employee
 */
router.put("/:id", verifyToken, employeeController.updateEmployee);

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee was successfully deleted
 *       404:
 *         description: The employee was not found
 *       500:
 *         description: Error deleting employee
 */
router.delete("/:id", verifyToken, employeeController.deleteEmployee);

module.exports = router;
