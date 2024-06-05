const request = require("supertest");
const app = require("../src/index"); // Ensure this path is correct
const Employee = require("../src/models/employee.model");
const jwt = require("jsonwebtoken");
const config = require("../src/config/jwt.config");

describe("Employee API Integration Tests", () => {
  let token;

  beforeAll(async () => {
    // Generate a valid JWT token for testing
    token = jwt.sign({ id: 1 }, config.secretKey, {
      expiresIn: config.tokenExpiration,
    });

    await Employee.sync({ force: true });
  });

  afterAll(async () => {
    await Employee.drop();
  });

  describe("POST /api/employee", () => {
    it("should create a new employee", async () => {
      const employeeData = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        designation: "Engineer",
        department: "Engineering",
        country_id: 1,
      };

      const res = await request(app)
        .post("/api/employee")
        .set("Authorization", `Bearer ${token}`)
        .send(employeeData)
        .expect(201);

      expect(res.body).toEqual(expect.objectContaining(employeeData));
    });

    it("should return an error if employee creation fails", async () => {
      const employeeData = {
        first_name: null,
        last_name: "Doe",
        email: "john.doe@example.com",
      };

      const res = await request(app)
        .post("/api/employee")
        .set("Authorization", `Bearer ${token}`)
        .send(employeeData)
        .expect(400);

      expect(res.body).toHaveProperty("message");
    });
  });
});
