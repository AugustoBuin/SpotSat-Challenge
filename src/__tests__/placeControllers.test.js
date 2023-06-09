const request = require('supertest');
const app = require('../server');
const sequelize = require('../config');
const Place = require('../models/place');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Place API', () => {
  describe('POST /api/places', () => {
    it('should create a new place', async () => {
      const response = await request(app)
        .post('/api/places')
        .send({
          name: 'Test Place',
          coordinates: {
            type: 'Point',
            coordinates: [0, 0],
          },
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Place');
      expect(response.body.coordinates.type).toBe('Point');
      expect(response.body.coordinates.coordinates).toEqual([0, 0]);
    });
  });

  describe('GET /api/places/:id', () => {
    it('should get a place by ID', async () => {
      const place = await Place.create({
        name: 'Test Place',
        coordinates: {
          type: 'Point',
          coordinates: [0, 0],
        },
      });

      const response = await request(app).get(`/api/places/${place.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Test Place');
      expect(response.body.coordinates.type).toBe('Point');
      expect(response.body.coordinates.coordinates).toEqual([0, 0]);
    });
  });

  describe('GET /api/places', () => {
    it('should list all places', async () => {
      await Place.bulkCreate([
        { name: 'Place 1', coordinates: { type: 'Point', coordinates: [0, 0] } },
        { name: 'Place 2', coordinates: { type: 'Point', coordinates: [1, 1] } },
      ]);

      const response = await request(app).get('/api/places');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
    });
  });

  describe('DELETE /api/places/:id', () => {
    it('should delete a place', async () => {
      const place = await Place.create({ name: 'Place to delete', coordinates: { type: 'Point', coordinates: [0, 0] } });

      const response = await request(app).delete(`/api/places/${place.id}`);

      expect(response.status).toBe(204);

      const deletedPlace = await Place.findByPk(place.id);
      expect(deletedPlace).toBeNull();
    });

    it('should return 404 if place does not exist', async () => {
      const response = await request(app).delete('/api/places/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/places/search', () => {
    it('should search for places within a circle', async () => {
      await Place.bulkCreate([
        { name: 'Place 1', coordinates: { type: 'Point', coordinates: [0, 0] } },
        { name: 'Place 2', coordinates: { type: 'Point', coordinates: [1, 1] } },
        { name: 'Place 3', coordinates: { type: 'Point', coordinates: [2, 2] } },
      ]);

      const response = await request(app).get('/api/places/search?lat=0&long=0&radius=1');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /api/places/distance', () => {
    it('should calculate the distance between two places', async () => {
      const place1 = await Place.create({ name: 'Place 1', coordinates: { type: 'Point', coordinates: [0, 0] } });
      const place2 = await Place.create({ name: 'Place 2', coordinates: { type: 'Point', coordinates: [1, 1] } });

      const response = await request(app).get(`/api/places/distance?lat1=0&long1=0&lat2=1&long2=1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('distance');
      expect(response.body.distance).toBeNumber();
    });
  });

  describe('GET /api/places/within', () => {
    it('should list places within an area', async () => {
      await Place.bulkCreate([
        { name: 'Place 1', coordinates: { type: 'Point', coordinates: [0, 0] } },
        { name: 'Place 2', coordinates: { type: 'Point', coordinates: [1, 1] } },
        { name: 'Place 3', coordinates: { type: 'Point', coordinates: [2, 2] } },
      ]);

      const response = await request(app).get('/api/places/within?lat1=0&long1=0&lat2=1&long2=1');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
    });
  });
});
