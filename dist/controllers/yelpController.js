"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YelpController = void 0;
class YelpController {
    constructor(yelpService) {
        this.findYelpProfile = async (req, res) => {
            const { url } = req.query;
            if (!url) {
                return res.status(400).send({ message: 'You must provide a term to search on Yelp.' });
            }
            const data = await this.yelpService.fetchYelpData(url);
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).send({ message: "Account doesn't exist or failed to fetch data." });
            }
        };
        this.yelpService = yelpService;
    }
}
exports.YelpController = YelpController;
