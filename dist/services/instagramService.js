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
exports.InstagramService = void 0;
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const instagramClient_1 = require("../clients/instagramClient");
dotenv.config();
class InstagramService {
    constructor() {
        this.baseInstagramUrl = `https://www.instagram.com`;
    }
    async fetchInstagramProfile(username) {
        try {
            const requestURL = `${this.baseInstagramUrl}/${username}`;
            const response = await axios_1.default.get(requestURL);
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            const textSearch = "Sorry, this page isn't available.";
            // Check if the text is found within any element on the page
            const elementContainingText = $(`*:contains('${textSearch}')`).first();
            if (elementContainingText.length) {
                console.log('Element found:', elementContainingText.html());
            }
            else {
                console.log('Text not found on the page.');
            }
        }
        catch (error) {
            console.error('Error fetching instagram data:', error);
            return null;
        }
    }
    async fetchWithPupeeter(username) {
        const client = new instagramClient_1.InstagramClient();
        await client.start();
        console.log('@instagram:', await client.getFollowers(username));
        await client.stop();
    }
}
exports.InstagramService = InstagramService;
