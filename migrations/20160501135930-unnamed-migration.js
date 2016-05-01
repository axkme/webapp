'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
          'announces',
          {
              id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
              },
              createdAt: {
                  type: Sequelize.DATE,
                  allowNull: false
              },
              updatedAt: {
                  type: Sequelize.DATE
              },
              title: {
                  type: Sequelize.STRING,
                  allowNull: false
              },
              message: {
                  type: Sequelize.STRING(4000),
                  allowNull: false
              },
              isActive: {
                  type: Sequelize.BOOLEAN(),
                  allowNull: false
              },
              userId: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "users", key: "id" }
              }
          }).then(function () {
              console.log('success');
          }).catch(function (err) {
              console.log(err);
          });
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
