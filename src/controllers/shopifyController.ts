import {Request, Response} from 'express';
import {ShopifyService} from "../services/shopifyService";
import {NotionService} from "../services/notionService";

export class ShopifyController {
    private shopifyService: ShopifyService;
    private notionService: NotionService;

    constructor(shopifyService: ShopifyService, notionService: NotionService) {
        this.shopifyService = shopifyService;
        this.notionService = notionService;
    }

    public updateNotionDB = async (req: Request, res: Response) => {
        try {
            await this.notionService.createNotionEntry({
                orderNumber: req.body.order_number,
                businessAddress: "",
                placeId: "",
                jsonContent: req.body.line_items
            });
            res.status(200)
        } catch (error) {
            console.error('Error fetching Google Maps screenshot:', error);
            res.status(400)
        }
    }

}
