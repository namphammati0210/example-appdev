'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Courses", {
      fields: ["courseCategoryId"],
      type: "foreign key",
      name: "custom_fkey_constraint_courseCategoryId",
      references: {
        //Required field
        table: "CourseCategories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Courses",
      "custom_fkey_constraint_courseCategoryId"
    );
  }
};
