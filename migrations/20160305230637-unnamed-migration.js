'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
      queryInterface.addColumn(
    'users',
    'role',
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }).then(function () {
          done();
    }).catch(function (err) {
        console.log(err);
    })
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn('users', 'role')
  }
};
