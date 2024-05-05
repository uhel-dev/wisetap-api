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
exports.YelpService = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class YelpService {
    async fetchYelpData(term) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer Cz_Z-2x_aBS8tK3pILVoQwe7oYwsBw0SDaPibtOymp2PybwXo0Qobh4hWqmJQ3p5wf4EipE-oRZ3DtM1Zs9Wt8Or97iDKjZggohraR-bF-hUOQHepxm9aBPLStQ3ZnYx'
                }
            };
            const { businesses } = await fetch(`https://api.yelp.com/v3/businesses/search?location=United%20Kingdom&term=${term}}&sort_by=best_match&limit=20`, options)
                .then(response => response.json())
                .then(response => {
                return response;
            })
                .catch(err => console.error(err));
            return businesses.map((business) => {
                const { alias, name, image_url, display_phone } = business;
                return {
                    alias,
                    name,
                    image_url,
                    display_phone
                };
            });
        }
        catch (error) {
            console.error('Error fetching Yelp data:', error);
            return null;
        }
    }
}
exports.YelpService = YelpService;
