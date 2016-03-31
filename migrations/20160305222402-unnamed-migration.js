'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {
      queryInterface.createTable(
     'users',
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
         username: {
             type: Sequelize.STRING,
             unique: true,
             allowNull: false
         },
         email: {
             type: Sequelize.STRING,
             unique: true,
             allowNull: false
         },
         password: {
             type: Sequelize.STRING,
             allowNull: false
         }
     }).then(function () {
         done();
     }).catch(function (err) {
         console.log(err);
     });
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.dropTable('users');
  }
};
