"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const yelpService_1 = require("../services/yelpService");
const yelpController_1 = require("../controllers/yelpController");
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
const yelpService = new yelpService_1.YelpService();
const yelpController = new yelpController_1.YelpController(yelpService);
router.get('/find', yelpController.findYelpProfile);
exports.default = router;
