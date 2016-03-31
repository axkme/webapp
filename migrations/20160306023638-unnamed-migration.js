'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'users',
          'roleId',
          {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: { model: "roles", key: "id" }
          }
        );
      queryInterface.removeColumn(
          'users',
          'role'
        );
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
