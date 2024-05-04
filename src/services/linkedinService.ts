import * as dotenv from 'dotenv';
import cheerio from "cheerio";
import puppeteer from "puppeteer";


export const dynamic = "force-dynamic";

dotenv.config();

export class LinkedinService {
    private baseLinkedinProfile = `https://www.linkedin.com/in`

    public async getBrowser() {
        return await puppeteer.launch();
    }

    public async fetchLinkedinProfile(username: any) {
        try {
            // Launch a headless browser
            const browser = await this.getBrowser()
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
            console.error('Error fetching linkedin data:', error);
            return null;
        }
    }
}
