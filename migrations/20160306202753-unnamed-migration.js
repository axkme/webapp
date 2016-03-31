'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
     'category',
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
         name: {
             type: Sequelize.STRING,
             unique: true,
             allowNull: false
         },
         description: {
             type: Sequelize.STRING,
             allowNull: true
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
