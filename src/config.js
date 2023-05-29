// database config
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
