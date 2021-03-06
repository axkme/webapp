'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
          'comments',
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
              message: {
                  type: Sequelize.STRING(4000),
                  allowNull: false
              },
              userId: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "users", key: "id" }
              },
              topicId: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "topics", key: "id" }
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
