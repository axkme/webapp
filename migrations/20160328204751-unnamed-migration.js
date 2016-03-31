'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
              'category',
              'icon',
              {
                  type: Sequelize.STRING,
                  allowNull: true
              }
            );
      queryInterface.addColumn(
           'category',
           'color',
           {
               type: Sequelize.STRING,
               allowNull: true
           }
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
