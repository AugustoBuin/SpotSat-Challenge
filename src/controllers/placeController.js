//
const { Op, Sequelize } = require('sequelize');
const { Area, Place } = require('../models/place');

module.exports = {
  async listPlaces(req, res) {
    try {
      const places = await Place.findAll();
      res.json(places);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(listPlaces)' });
    }
  },

  async createPlace(req, res) {
    try {
      const { name, latitude, longitude } = req.body;
      const place = await Place.create({
        place_name: name,
        place_latitude: latitude,
        place_longitude: longitude,
      });
      res.status(201).json(place);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(createPlace)' });
    }
  },


  async getPlace(req, res) {
    try {
      const { id } = req.params;
      const place = await Place.findByPk(id);
      if (!place) {
        res.status(404).json({ error: 'Place not found' });
      } else {
        res.json(place);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(getPlace)' });
    }
  },

  async deletePlace(req, res) {
    try {
      const { id } = req.params;
      const place = await Place.findByPk(id);
      if (!place) {
        res.status(404).json({ error: 'Place not found(deletePlace)' });
      } else {
        await place.destroy();
        res.sendStatus(204);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(deletePlace)' });
    }
  },

  async searchPlaceInCircle(req, res) {
    try {
      const { lat, long, radius } = req.query;
      const places = await Place.findAll({
        where: Sequelize.literal(`ST_DWithin(ST_MakePoint(place_longitude, place_latitude)::geography, ST_MakePoint(${long}, ${lat})::geography, ${radius})`),
      });
      res.json(places);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(searchPlaceInCircle)' });
    }
  },


  async calculateDistance(req, res) {
    try {
      const { lat1, long1, lat2, long2 } = req.query;
      const distance = Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(long1 - long2, 2));
      res.json({ distance });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(calculateDistance)' });
    }
  },

  async listPlacesWithinArea(req, res) {
    try {
      const { lat1, long1, lat2, long2 } = req.query;
      const places = await Place.findAll({
        where: {
          coordinates: {
            [Op.within]: {
              type: 'Polygon',
              coordinates: [
                [[parseFloat(long1), parseFloat(lat1)], [parseFloat(long2), parseFloat(lat1)], [parseFloat(long2), parseFloat(lat2)], [parseFloat(long1), parseFloat(lat2)], [parseFloat(long1), parseFloat(lat1)]]
              ],
            },
          },
        },
      });
      res.json(places);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error(listPlacesWithinArea)' });
    }
  },

  async listPlacesWithinArea(req, res) {
    try {
      const { lat1, long1, lat2, long2 } = req.query;
      const places = await Place.findAll({
        where: {
          coordinates: {
            [Op.within]: {
              type: 'Polygon',
              coordinates: [
                [
                  [parseFloat(long1), parseFloat(lat1)],
                  [parseFloat(long2), parseFloat(lat1)],
                  [parseFloat(long2), parseFloat(lat2)],
                  [parseFloat(long1), parseFloat(lat2)],
                  [parseFloat(long1), parseFloat(lat1)],
                ],
              ],
            },
          },
        },
      });
      res.json(places);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error(listPlacesWithinArea)' });
    }
  },

};
