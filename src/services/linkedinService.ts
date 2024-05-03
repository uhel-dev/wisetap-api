import * as dotenv from 'dotenv';
import cheerio from "cheerio";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";


export const dynamic = "force-dynamic";

dotenv.config();

export class LinkedinService {
    private baseLinkedinProfile = `https://www.linkedin.com/in`

    public async getBrowser() {
        if (process.env.VERCEL_ENV === "production") {
            const executablePath = await chromium.executablePath();

            const browser = await puppeteerCore.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath,
                headless: chromium.headless === true ? chromium.headless : undefined,
            });
            return browser;
        } else {
            const browser = await puppeteer.launch();
            return browser;
        }
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
