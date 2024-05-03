import {Router} from 'express';
import path from "path";
import {WhatsappController} from "../controllers/whatsappController";
import {WhatsappService} from "../services/whatsappService";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const whatsappService = new WhatsappService();
const whatsappController = new WhatsappController(whatsappService);


router.get('/auth', (req, res) => {
    res.sendFile(path.join(basePath, 'public', 'instagram-auth.html'));
})
router.get('/find', whatsappController.findNumber);


export default router;