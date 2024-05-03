"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const snapchatService_1 = require("../services/snapchatService");
const snapchatController_1 = require("../controllers/snapchatController");
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
const snapchatService = new snapchatService_1.SnapchatService();
const snapchatController = new snapchatController_1.SnapchatController(snapchatService);
router.get('/find', snapchatController.findSnapchatProfile);
exports.default = router;
