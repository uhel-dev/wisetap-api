"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const linkedinController_1 = require("../controllers/linkedinController");
const linkedinService_1 = require("../services/linkedinService");
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
const linkedinService = new linkedinService_1.LinkedinService();
const linkedinController = new linkedinController_1.LinkedinController(linkedinService);
router.get('/find', linkedinController.findLinkedinProfile);
exports.default = router;
