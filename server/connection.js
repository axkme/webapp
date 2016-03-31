var Sequelize = require('sequelize');
var sequelize = new Sequelize('devdb', 'tugg@tuggdevdb', 'Pass1234', {
    host: 'tuggdevdb.database.windows.net',
    dialect: 'mssql',
    pool: {
        maxConnections: 100,
        minConnections: 0,
        maxIdleTime: 10000
    },
    dialectOptions: {
      encrypt: true
    },
    omitNull: true
});
module.exports = sequelize;