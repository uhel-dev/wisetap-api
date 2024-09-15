"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyController = void 0;
class ShopifyController {
    constructor(shopifyService, notionService) {
        this.updateNotionDB = async (req, res) => {
            try {
                await this.notionService.createNotionEntry({
                    orderNumber: req.body.order_number,
                    businessAddress: "",
                    placeId: "",
                    jsonContent: req.body.line_items
                });
                res.status(200);
            }
            catch (error) {
                console.error('Error fetching Google Maps screenshot:', error);
                res.status(400);
            }
        };
        this.shopifyService = shopifyService;
        this.notionService = notionService;
    }
}
exports.ShopifyController = ShopifyController;
