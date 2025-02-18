"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Post_Tags", {
      fields: ["post_id"],
      type: "foreign key",
      name: "fk-to-Post_Tags-post_id",
      references: {
        table: "Posts",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Post_Tags", {
      fields: ["tag_id"],
      type: "foreign key",
      name: "fk-to-Post_Tags-tag_id",
      references: {
        table: "Tags",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Post_Tags",
      "fk-to-Post_Tags-post_id"
    );
    await queryInterface.removeConstraint(
      "Post_Tags",
      "fk-to-Post_Tags-tag_id"
    );
  },
};
