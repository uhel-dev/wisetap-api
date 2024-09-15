"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const shopifyService_1 = require("../services/shopifyService");
const shopifyController_1 = require("../controllers/shopifyController");
const notionService_1 = require("../services/notionService");
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
const shopifyService = new shopifyService_1.ShopifyService();
const notionService = new notionService_1.NotionService();
const shopifyController = new shopifyController_1.ShopifyController(shopifyService, notionService);
router.post('/order-created', shopifyController.updateNotionDB);
exports.default = router;
