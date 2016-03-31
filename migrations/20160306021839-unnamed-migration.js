'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.renameColumn('users', 'role', 'roleId');
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
