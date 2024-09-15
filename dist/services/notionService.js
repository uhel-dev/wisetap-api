"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionService = void 0;
const dotenv = __importStar(require("dotenv"));
const client_1 = require("@notionhq/client");
dotenv.config();
class NotionService {
    constructor() {
        this.apiKey = process.env.NOTION_API_KEY;
        this.notion = new client_1.Client({ auth: this.apiKey });
        this.createNotionData = ({ orderNumber, businessAddress, placeId, jsonContent }) => {
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
        };
    }
    async createNotionEntry(data) {
        try {
            console.log('Notion API Key:', this.apiKey);
            console.log('Notion Database ID:', process.env.NOTION_DATABASE_ID);
            // Create entry in Notion
            const notionData = this.createNotionData(data);
            console.log('Request Data:', JSON.stringify(notionData, null, 2));
            await this.notion.pages.create(notionData);
        }
        catch (error) {
            console.error('Error uploading data to notion:', error);
            return null;
        }
    }
    async searchByTitle() {
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
        return response;
    }
}
exports.NotionService = NotionService;
