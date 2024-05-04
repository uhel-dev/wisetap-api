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

            const elements = $('[class^="NoContent_title"]');
            if (elements.length > 0) {
                console.log('Element not found:');
                return null
            }

            // Check if the text is found within any element on the page
            const name = $('h4').text()
            const snapchatUsername = $('h5').text()
            const snapchatQRCodeIMG: any = ($('img')[2])
                if(snapchatQRCodeIMG) {
                    const snapchatQRCode = snapchatQRCodeIMG.attribs.src
                    return {
                        name,
                        snapchatUsername,
                        snapchatQRCode
                    }
                }
                else {
                    return {
                        name,
                        snapchatUsername,
                        snapchatQRCode: `https://app.snapchat.com/web/deeplink/snapcode?username=${snapchatUsername}&type=SVG&bitmoji=enable`
                    }
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
