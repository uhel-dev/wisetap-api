"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const basePath = __dirname.includes('/src/routes') ? path_1.default.join(__dirname, '..', '..') : __dirname;
router.get('/privacy-policy', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'privacy-policy.html'));
});
router.get('/data-deletion', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'data-deletion.html'));
});
exports.default = router;
