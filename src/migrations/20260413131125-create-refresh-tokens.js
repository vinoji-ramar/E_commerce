"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refresh_tokens", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",  // FK → users.id
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      isRevoked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable("refresh_tokens");
  }
};