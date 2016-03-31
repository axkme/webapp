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
            sid: {
                type: Sequelize.STRING,
                allowNull: false
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
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: true
            },
            color: {
                type: Sequelize.STRING,
                allowNull: true
            }

        }).then(function () {
            console.log('success');
        }).catch(function (err) {
            console.log(err);
        });
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.dropTable('category').then(function () {
          console.log('success');
      }).catch(function (err) {
          console.log(err);
      });
  }
};
