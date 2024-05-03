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

export class SnapchatService {
    private baseSnapchatURL = `https://www.snapchat.com/add`

    public async fetchSnapchatProfile(username: any) {
        try {

            const requestURL = `${this.baseSnapchatURL}/${username}`
            const response = await axios.get(requestURL);
            const html = response.data;
            const $ = cheerio.load(html);

            const textSearch = "Sorry, this page isn't available.";

            const elements = $('[class^="NoContent_title"]');
            if (elements.length > 0) {
                console.log('Element not found:');
                return null
            }

            // Check if the text is found within any element on the page
            const name = $('h4').text()
            const snapchatUsername = $('h5').text()
            const snapchatQRCode = ($('img')[2] as any).attribs.src

            return {
                name,
                snapchatUsername,
                snapchatQRCode
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
