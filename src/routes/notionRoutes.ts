import {Router} from 'express';
import path from "path";
import {LinkedinController} from "../controllers/linkedinController";
import {LinkedinService} from "../services/linkedinService";
import {NotionController} from "../controllers/notionController";
import {NotionService} from "../services/notionService";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const notionService= new NotionService()
const notionController = new NotionController(notionService)



router.post('/create-entry', notionController.saveEntry);


export default router;