import puppeteer from "puppeteer";
import {InstagramService} from "../services/instagramService";

export class InstagramClient {
    private browser: any;

    constructor() {
    }

    async start() {
        this.browser = await puppeteer.launch({
            headless: true //When set to true, a new browser window will ge opened
        })
    }

    async stop() {
        await this.browser.close()
    }

    async getFollowers(username:string ) {
        if (!this.browser) throw new Error('Browser not started')

        const page = await this.browser.newPage()
        await page.goto(`https://instagram.com/${username}/`)

        const pageExists = await page.evaluate((_: any) => {
            return document.querySelector('.error-container') === null
        })
        if (!pageExists) {
            throw new Error(`Page of ${username} doesn't exist`)
        }

        //Wait until the page got completly renderer
        await page.waitForSelector('h2')

        const content = await page.content()

        const followers = await page.evaluate((username: string) => {
            //This code will get executed on the instagram page

            //Get the number of followers
            // const followers = document.querySelector(`a[href="/accounts/login/?next=%2F${username}%2Ffollowers%2F&source=followed_by_list"]`).querySelector('span').innerText
            //Return the number of followers back to the node process
            return followers
        }, username)

        page.close()

        return followers
    }
}
