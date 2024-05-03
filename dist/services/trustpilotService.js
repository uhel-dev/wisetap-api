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
exports.TrustpilotService = void 0;
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
dotenv.config();
class TrustpilotService {
    constructor() {
        this.baseTrustpilotUrl = `https://uk.trustpilot.com/review`;
    }
    async fetchTrustpilotData(url) {
        try {
            const requestURL = url.match(/trustpilot.com\/review\//i) ? url : `${this.baseTrustpilotUrl}/${url}`;
            const response = await axios_1.default.get(requestURL);
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            const result = $('script').last().html();
            if (!result)
                return null;
            const parsedResponse = JSON.parse(result);
            const businessUnit = parsedResponse.props.pageProps.businessUnit;
            const { displayName, identifyingName, numberOfReviews, trustScore, websiteUrl, stars } = businessUnit;
            const starsUrl = `https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-${stars}.svg`;
            const trustpilotProfile = {
                displayName: displayName ? displayName : "",
                identifyingName: identifyingName ? identifyingName : "",
                numberOfReviews: numberOfReviews ? numberOfReviews : "",
                trustScore: trustScore ? trustScore : "",
                websiteUrl: websiteUrl ? websiteUrl : "",
                stars: stars ? stars : "",
                starsUrl: starsUrl ? starsUrl : "",
                profileImageUrl: businessUnit.profileImageUrl ? businessUnit.profileImageUrl : "",
            };
            return trustpilotProfile;
        }
        catch (error) {
            console.error('Error fetching Trustpilot data:', error);
            return null;
        }
    }
}
exports.TrustpilotService = TrustpilotService;
