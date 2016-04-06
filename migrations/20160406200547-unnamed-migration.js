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
            sid: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
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
            console.log('success');
        }).catch(function (err) {
            console.log(err);
        });
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.dropTable('topics');
  }
};
