"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionController = void 0;
class NotionController {
    constructor(notionService) {
        this.saveEntry = async (req, res) => {
            const apiKey = process.env.NOTION_API_KEY;
            try {
                const mapsStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(req.body.businessAddress)}&zoom=15&size=600x400&key=${process.env.GOOGLE_MAPS_API_KEY}`;
                // await this.notionService.createNotionEntry()
                console.log('s');
                // Option 1: Use Google Maps Static API to get the image URL directly
                // This is simpler and avoids using Puppeteer
            }
            catch (error) {
                console.error('Error fetching Google Maps screenshot:', error);
            }
        };
        this.notionService = notionService;
    }
}
exports.NotionController = NotionController;
