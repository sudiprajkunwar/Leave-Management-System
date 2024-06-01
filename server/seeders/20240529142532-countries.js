"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = [
      { id: 1, name: "United States", code: "US" },
      { id: 2, name: "Canada", code: "CA" },
      { id: 3, name: "United Kingdom", code: "UK" },
      { id: 4, name: "Nepal", code: "NEP" },
    ];

    await queryInterface.bulkInsert("countries", countries, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
