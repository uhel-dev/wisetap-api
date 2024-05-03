import * as dotenv from 'dotenv';
import axios from "axios";
import cheerio from "cheerio";
import {
    TrustpilotBusinessUnit,
    TrustpilotBusinessUnitResponse,
    TrustpilotProfile
} from "../types/TrustpilotProfileData";
import {InstagramClient} from "../clients/instagramClient";

dotenv.config();

export class InstagramService {
    private baseInstagramUrl = `https://www.instagram.com`

    public async fetchInstagramProfile(username: any) {
        try {

            const requestURL = `${this.baseInstagramUrl}/${username}`
            const response = await axios.get(requestURL);
            const html = response.data;
            const $ = cheerio.load(html);

            const textSearch = "Sorry, this page isn't available.";

            // Check if the text is found within any element on the page
            const elementContainingText = $(`*:contains('${textSearch}')`).first();

            if (elementContainingText.length) {
                console.log('Element found:', elementContainingText.html());
            } else {
                console.log('Text not found on the page.');
            }

        } catch (error) {
            console.error('Error fetching instagram data:', error);
            return null;
        }
    }


    public async fetchWithPupeeter(username: any) {
        const client = new InstagramClient()

        await client.start()

        console.log('@instagram:', await client.getFollowers(username))

        await client.stop()
    }

}
