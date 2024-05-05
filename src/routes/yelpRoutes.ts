import {Router} from 'express';
import path from "path";
import {GoogleMapsService} from "../services/googleMapsService";
import {TrustpilotController} from "../controllers/trustpilotController";
import {TrustpilotService} from "../services/trustpilotService";
import {YelpService} from "../services/yelpService";
import {YelpController} from "../controllers/yelpController";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const yelpService = new YelpService();
const yelpController = new YelpController(yelpService);


router.get('/find', yelpController.findYelpProfile);


export default router;