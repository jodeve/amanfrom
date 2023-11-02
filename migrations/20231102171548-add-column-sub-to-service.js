'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('services', 'sub', Sequelize.TEXT);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("services", "sub")
  }
};
