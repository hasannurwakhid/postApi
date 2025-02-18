"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(200),
      },
      slug: {
        type: Sequelize.STRING(200),
      },
      content: {
        type: Sequelize.TEXT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      thumbnail: {
        type: Sequelize.STRING(255),
      },
      published_at: {
        type: Sequelize.DATE,
      },
      meta_title: {
        type: Sequelize.STRING(100),
      },
      meta_description: {
        type: Sequelize.STRING(150),
      },
      status: {
        type: Sequelize.ENUM("publish", "draft"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
