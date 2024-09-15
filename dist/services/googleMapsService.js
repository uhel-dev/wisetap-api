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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapsService = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class GoogleMapsService {
    constructor() {
        this.client = new google_maps_services_js_1.Client({});
    }
    findPlacesV2(query) {
        return this.client.placeAutocomplete({
            params: {
                input: query,
                components: ['country:uk'],
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });
    }
    findPlaces(query) {
        const request = {
            params: {
                query: query,
                location: 'uk',
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000
        };
        return this.client.textSearch(request);
    }
    fetchGoogleProfilePhoto(photoReference) {
        const request = {
            params: {
                photoreference: photoReference,
                maxwidth: 400,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            responseType: 'stream' // Set response type to 'stream'
        };
        return this.client.placePhoto(request);
    }
}
exports.GoogleMapsService = GoogleMapsService;
