//
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Place = sequelize.define('Place', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.GEOGRAPHY('POINT'),
    allowNull: false,
  },
});

module.exports = Place;
