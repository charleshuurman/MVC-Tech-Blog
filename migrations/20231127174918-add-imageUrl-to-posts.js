'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'imageUrl');
  }
};
