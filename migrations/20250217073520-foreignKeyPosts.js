"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Posts", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk-to-Posts-user_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Posts", {
      fields: ["category_id"],
      type: "foreign key",
      name: "fk-to-Posts-category_id",
      references: {
        table: "Categories",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Posts", "fk-to-Posts-user_id");
    await queryInterface.removeConstraint("Posts", "fk-to-Posts-category_id");
  },
};
