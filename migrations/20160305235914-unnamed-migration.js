'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
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
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('roles', 'updatedAt');
    }
};
