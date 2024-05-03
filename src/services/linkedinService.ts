import * as dotenv from 'dotenv';
import cheerio from "cheerio";
// import puppeteer from "puppeteer";
import chromium from 'chrome-aws-lambda';

dotenv.config();

export class LinkedinService {
    private baseLinkedinProfile = `https://www.linkedin.com/in`

    public async fetchLinkedinProfile(username: any) {
        try {
            // Launch a headless browser
            const browser = await chromium.puppeteer.launch({
                args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: true,
                ignoreHTTPSErrors: true,
            })
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
