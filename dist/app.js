"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello World with TypeScript');
});
// FACEBOOK / INSTAGRAM APP POLICIES
app.get('/policies/privacy-policy', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'privacy-policy.html'));
});
app.get('/policies/data-deletion', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'data-deletion.html'));
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
