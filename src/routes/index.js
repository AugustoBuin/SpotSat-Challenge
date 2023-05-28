//
const express = require('express');
const router = express.Router();

const placeController = require('../controllers/placeController');

// base route: http://localhost:3000/api/
router.get('/places', placeController.listPlaces);
router.post('/places', placeController.createPlace);
router.get('/places/:id', placeController.getPlace);
router.delete('/places/:id', placeController.deletePlace);
router.get('/places/search', placeController.searchPlaceInCircle);
router.get('/places/distance', placeController.calculateDistance);
router.get('/places/within', placeController.listPlacesWithinArea);

module.exports = router;
