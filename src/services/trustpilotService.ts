import * as dotenv from 'dotenv';
import axios from "axios";
import cheerio from "cheerio";
import {
    TrustpilotBusinessUnit,
    TrustpilotBusinessUnitResponse,
    TrustpilotProfile
} from "../types/TrustpilotProfileData";

dotenv.config();

export class TrustpilotService {
    private baseTrustpilotUrl = `https://uk.trustpilot.com/review`

    public async fetchTrustpilotData(url: any) {
        try {

            const requestURL = url.match(/trustpilot.com\/review\//i) ? url : `${this.baseTrustpilotUrl}/${url}`
            const response = await axios.get(requestURL);
            const html = response.data;
            const $ = cheerio.load(html);
            const result: string | null = $('script').last().html()
            if(!result)
                return null

            const parsedResponse: TrustpilotBusinessUnitResponse = JSON.parse(result)
            const businessUnit: TrustpilotBusinessUnit = parsedResponse.props.pageProps.businessUnit
            const { displayName, identifyingName, numberOfReviews, trustScore, websiteUrl, stars } = businessUnit
            const starsUrl = `https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-${stars}.svg`
            const trustpilotProfile: TrustpilotProfile = {
                displayName: displayName ? displayName : "",
                identifyingName: identifyingName ? identifyingName : "",
                numberOfReviews: numberOfReviews ? numberOfReviews : "",
                trustScore: trustScore ? trustScore : "",
                websiteUrl: websiteUrl ? websiteUrl : "",
                stars: stars ? stars : "",
                starsUrl: starsUrl ? starsUrl : "",
                profileImageUrl: businessUnit.profileImageUrl ? businessUnit.profileImageUrl : "",
            };
            return trustpilotProfile
        } catch (error) {
            console.error('Error fetching Trustpilot data:', error);
            return null;
        }
    }

}
