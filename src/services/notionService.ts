import * as dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();

export class NotionService {
    private apiKey = process.env.NOTION_API_KEY
    private notion = new Client({ auth: this.apiKey });


    public async createNotionEntry(data: any) {
        try {
            console.log('Notion API Key:', this.apiKey);
            console.log('Notion Database ID:', process.env.NOTION_DATABASE_ID);

            // Create entry in Notion
            const notionData = this.createNotionData(data);

            console.log('Request Data:', JSON.stringify(notionData, null, 2));
            await this.notion.pages.create(notionData as any);

        } catch (error) {
            console.error('Error uploading data to notion:', error);
            return null;
        }
    }



    public async searchByTitle() {
        const response = await this.notion.search({
            query: 'External tasks',
            filter: {
                value: 'database',
                property: 'object'
            },
            sort: {
                direction: 'ascending',
                timestamp: 'last_edited_time'
            },
        });
        console.log(response);
        return response
    }

    private createNotionData = ({orderNumber, businessAddress, placeId, jsonContent}: any) => {
        return {
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                'JSON Content': {
                    rich_text: [
                        {
                            text: {
                                content: JSON.stringify(jsonContent),
                            },
                        },
                    ],
                },
                'Order Number': {
                    title: [
                        {
                            text: {
                                content: JSON.stringify(orderNumber),
                            },
                        },
                    ],
                },
                'Business Address': {
                    rich_text: [
                        {
                            text: {
                                content: businessAddress,
                            },
                        },
                    ],
                },
                'Place ID': {
                    rich_text: [
                        {
                            text: {
                                content: placeId,
                            },
                        },
                    ],
                },
            },
        };
    }
}
