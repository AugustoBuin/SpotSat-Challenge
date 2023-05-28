// database config
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('spotsatdb', 'postgres', 'Morgana', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
