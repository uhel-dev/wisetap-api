"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinService = void 0;
const dotenv = __importStar(require("dotenv"));
const cheerio_1 = __importDefault(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
dotenv.config();
class LinkedinService {
    constructor() {
        this.baseLinkedinProfile = `https://www.linkedin.com/in`;
    }
    async fetchLinkedinProfile(username) {
        try {
            // Launch a headless browser
            const browser = await puppeteer_1.default.launch();
            const page = await browser.newPage();
            // Navigate to the URL
            await page.goto(`${this.baseLinkedinProfile}/${username}`, { waitUntil: 'networkidle0' });
            const html = await page.content();
            const $ = cheerio_1.default.load(html);
            let profileName = $('h1').text().trim();
            let profileDescription = $('[class^="top-card-layout__headline"]').text().trim();
            let pictureElement = $('img')[2];
            let profileOrigin = $('[class^="not-first-middot"]').text().split('\n').map(el => el.trim()).filter(s => s !== "")[0];
            let profilePicture = pictureElement.attribs.src;
            // Close the browser
            await browser.close();
            return {
                profileName,
                profileDescription,
                profileOrigin,
                profilePicture
            };
        }
        catch (error) {
            console.error('Error fetching instagram data:', error);
            return null;
        }
    }
}
exports.LinkedinService = LinkedinService;
