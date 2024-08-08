import { Router } from 'express';
import { GoogleMapsController } from '../controllers/googleMapsController';
import { GoogleMapsService } from '../services/googleMapsService';

const router = Router();
const googleMapsService = new GoogleMapsService();
const googleMapsController = new GoogleMapsController(googleMapsService);

router.get('/find', googleMapsController.findPlaces);
router.get('/find_v2', googleMapsController.findPlacesV2);
router.get('/photo', googleMapsController.fetchGoogleProfilePhoto);

export default router;
