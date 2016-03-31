'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
                'roles',
                'sid',
                {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,

                }).then(function () {
                    done();
                }).catch(function (err) {
                    console.log(err);
                }).then(function () {
                    queryInterface.addColumn(
                'users',
                'sid',
                {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,

                }).then(function () {
                    done();
                }).catch(function (err) {
                    console.log(err);
                });
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
