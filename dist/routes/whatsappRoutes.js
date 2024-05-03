"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const whatsappController_1 = require("../controllers/whatsappController");
const whatsappService_1 = require("../services/whatsappService");
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
const whatsappService = new whatsappService_1.WhatsappService();
const whatsappController = new whatsappController_1.WhatsappController(whatsappService);
router.get('/auth', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'instagram-auth.html'));
});
router.get('/find', whatsappController.findNumber);
exports.default = router;
