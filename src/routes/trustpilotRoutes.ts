import {Router} from 'express';
import path from "path";
import {GoogleMapsService} from "../services/googleMapsService";
import {TrustpilotController} from "../controllers/trustpilotController";
import {TrustpilotService} from "../services/trustpilotService";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const trustpilotService = new TrustpilotService();
const trustpilotController = new TrustpilotController(trustpilotService);


router.get('/find', trustpilotController.findTrustpilotProfile);


export default router;