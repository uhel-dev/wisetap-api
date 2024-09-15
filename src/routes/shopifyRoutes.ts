import {Router} from 'express';
import path from "path";
import {ShopifyService} from "../services/shopifyService";
import {ShopifyController} from "../controllers/shopifyController";
import {NotionService} from "../services/notionService";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

const shopifyService= new ShopifyService()
const notionService= new NotionService()
const shopifyController = new ShopifyController(shopifyService, notionService)


router.post('/order-created', shopifyController.updateNotionDB);


export default router;