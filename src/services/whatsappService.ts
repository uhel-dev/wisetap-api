import * as dotenv from 'dotenv';
import axios from "axios";
import cheerio from "cheerio";
import {
    TrustpilotBusinessUnit,
    TrustpilotBusinessUnitResponse,
    TrustpilotProfile
} from "../types/TrustpilotProfileData";

dotenv.config();

export class WhatsappService {
    private baseTrustpilotUrl = `https://uk.trustpilot.com/review`

    public async fetchWhatsappNumber(url: any) {
        try {
            console.log('Fetching Whatsapp Number')
        } catch (error) {
            console.error('Error fetching Trustpilot data:', error);
            return null;
        }
    }

}
