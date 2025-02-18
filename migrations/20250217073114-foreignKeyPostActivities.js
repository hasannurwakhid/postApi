"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Post_Activities", {
      fields: ["post_id"],
      type: "foreign key",
      name: "fk-to-Post_Activities-post_id",
      references: {
        table: "Posts",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Post_Activities",
      "fk-to-Post_Activities-post_id"
    );
  },
};
