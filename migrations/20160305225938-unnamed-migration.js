'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable(
            'roles', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                }, name: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false
                }
            }).then(function () {
                done();
            }).catch(function (err) {
                console.log(err);
            });
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable('roles');
    }
};
