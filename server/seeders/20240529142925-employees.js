"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employees = [];
    for (let i = 0; i < 20; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.helpers.unique(faker.internet.email, [
        firstName,
        lastName,
      ]);
      employees.push({
        id: i + 1,
        first_name: firstName,
        last_name: lastName,
        email: email,
        designation: faker.helpers.arrayElement([
          "Manager",
          "Assistant Manager",
          "Engineer",
          "Associate",
          "Principal",
        ]),
        department: faker.helpers.arrayElement([
          "HR",
          "Finance",
          "Engineering",
          "Sales",
          "Marketing",
        ]),
        country_id: faker.number.int({ min: 1, max: 4 }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("employees", employees, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
