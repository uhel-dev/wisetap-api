import {Router} from 'express';
import path from "path";
import {LinkedinController} from "../controllers/linkedinController";
import {LinkedinService} from "../services/linkedinService";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const linkedinService= new LinkedinService()
const linkedinController = new LinkedinController(linkedinService)



router.get('/find', linkedinController.findLinkedinProfile);


export default router;