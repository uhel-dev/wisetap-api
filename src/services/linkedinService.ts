import * as dotenv from 'dotenv';
import axios from "axios";
import cheerio from "cheerio";
import {
    TrustpilotBusinessUnit,
    TrustpilotBusinessUnitResponse,
    TrustpilotProfile
} from "../types/TrustpilotProfileData";
import {InstagramClient} from "../clients/instagramClient";
import puppeteer from "puppeteer";

dotenv.config();

export class LinkedinService {
    private baseLinkedinProfile = `https://www.linkedin.com/in`

    public async fetchLinkedinProfile(username: any) {
        try {
            // Launch a headless browser
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Navigate to the URL
            await page.goto(`${this.baseLinkedinProfile}/${username}`, { waitUntil: 'networkidle0' });

            const html = await page.content();
            const $ = cheerio.load(html);
            let profileName = $('h1').text().trim()
            let profileDescription = $('[class^="top-card-layout__headline"]').text().trim()
            let pictureElement: any = $('img')[2]
            let profileOrigin = $('[class^="not-first-middot"]').text().split('\n').map(el => el.trim()).filter(s => s !== "")[0]
            let profilePicture = pictureElement.attribs.src

            // Close the browser
            await browser.close();

            return {
                profileName,
                profileDescription,
                profileOrigin,
                profilePicture
            }

        } catch (error) {
            console.error('Error fetching instagram data:', error);
            return null;
        }
    }
}
