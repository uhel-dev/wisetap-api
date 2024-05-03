"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const trustpilotController_1 = require("../controllers/trustpilotController");
const trustpilotService_1 = require("../services/trustpilotService");
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
const trustpilotService = new trustpilotService_1.TrustpilotService();
const trustpilotController = new trustpilotController_1.TrustpilotController(trustpilotService);
router.get('/find', trustpilotController.findTrustpilotProfile);
exports.default = router;
