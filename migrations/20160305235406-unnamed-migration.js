'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
      'roles',
      'createdAt',
      {
          type: Sequelize.DATE,
          allowNull: false
      }).then(function () {
          queryInterface.addColumn(
          'roles',
          'updatedAt',
          {
              type: Sequelize.DATE,
              allowNull: false
          }).then(function () {
              done();
          }).catch(function (err) {
              console.log(err);
          });
      }).catch(function (err) {
          console.log(err);
      });
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn('roles', 'createdAt');
      queryInterface.removeColumn('roles', 'updatedAt');
  }
};
