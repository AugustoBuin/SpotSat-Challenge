//
const express = require('express');
const router = express.Router();

const placeController = require('../controllers/placeController');

// base route: http://localhost:port/api/
//For places
router.get('/places', placeController.listPlaces);
router.post('/places', placeController.createPlace);
router.get('/places/:id', placeController.getPlace);
router.delete('/places/:id', placeController.deletePlace);
router.get('/places/search', placeController.searchPlaceInCircle);
router.get('/places/distance', placeController.calculateDistance);
router.get('/places/within', placeController.listPlacesWithinArea);
//For areas
router.get('/areas', placeController.listAreas);
router.post('/areas', placeController.createArea);
router.get('/areas/:id', placeController.getArea);
router.delete('/areas/:id', placeController.deleteArea);

module.exports = router;
