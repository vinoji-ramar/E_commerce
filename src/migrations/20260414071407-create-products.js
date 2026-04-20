"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  }
};