"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable("refresh_tokens", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {   // ✅ FIX
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },

  token: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  expires_at: {   // ✅ FIX
    type: Sequelize.DATE,
    allowNull: false
  },

  is_revoked: {   // ✅ FIX
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },

  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("refresh_tokens");
  }
};