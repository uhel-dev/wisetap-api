import {Router} from 'express';
import path from "path";
import {InstagramService} from "../services/instagramService";
import {InstagramController} from "../controllers/instagramController";
import {SnapchatService} from "../services/snapchatService";
import {SnapchatController} from "../controllers/snapchatController";
import {corsOptions} from "../config/corsOptions";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const snapchatService = new SnapchatService()
const snapchatController = new SnapchatController(snapchatService)



router.get('/find', snapchatController.findSnapchatProfile);


export default router;