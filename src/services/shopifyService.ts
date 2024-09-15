import * as dotenv from 'dotenv';
import {Client} from "@notionhq/client";

dotenv.config();

export class ShopifyService {
    private apiKey = process.env.NOTION_API_KEY
    private shopify = new Client({ auth: this.apiKey });

}
