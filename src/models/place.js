//
const Sequelize = require('sequelize');
const database = require('../config')

const Place = database.define('place', {
  place_id: {
    type: Sequelize.INTEGER,
    serial: true,
    allowNull: false,
    primaryKey: true
  },
  place_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  place_latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  place_longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  coordinates: {
    type: Sequelize.GEOGRAPHY('POINT'),
    allowNull: false,
  },
});
const Area = database.define('area', {
  area_id: {
    type: Sequelize.INTEGER,
    serial: true,
    allowNull: false,
    primaryKey: true
  },
  area_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  polygon_geom: {
    type: Sequelize.GEOGRAPHY('POINT'),
    allowNull: false,
  }
});

module.exports = Place, Area;
