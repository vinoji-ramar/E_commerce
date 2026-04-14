"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",   // FK → orders.id
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products", // FK → products.id
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      unitPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable("order_items");
  }
};