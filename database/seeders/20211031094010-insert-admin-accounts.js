"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Admins", [
      {
        fullname: "admin1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "admin2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "admin3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Admins", {
      [Op.or]: [
        {
          fullname: "admin1",
        },
        {
          fullname: "admin2",
        },
        {
          fullname: "admin3",
        }
      ],
    });
  },
};
