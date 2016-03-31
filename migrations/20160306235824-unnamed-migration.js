'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
          'topics',
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
                  unique: true,
                  allowNull: false
              },
              sid: {
                  type: Sequelize.STRING,
                  unique: true,
                  allowNull: false
              },
              message: {
                  type: Sequelize.STRING(2000),
                  allowNull: true
              },
              userId: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "users", key: "id" }
              },
              categoryId: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "category", key: "id" }
              }
          }).then(function () {
              done();
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
