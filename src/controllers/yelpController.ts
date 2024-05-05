import {Request, Response} from 'express';
import {TrustpilotService} from "../services/trustpilotService";
import {TrustpilotProfile} from "../types/TrustpilotProfileData";
import {YelpService} from "../services/yelpService";

export class YelpController {
    private yelpService: YelpService;

    constructor(yelpService: YelpService) {
        this.yelpService = yelpService;
    }

    public findYelpProfile = async (req: Request, res: Response) => {
        const { url } = req.query;
        if (!url) {
            return res.status(400).send({ message: 'You must provide a term to search on Yelp.' });
        }
        const data: any = await this.yelpService.fetchYelpData(url);
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).send({ message: "Account doesn't exist or failed to fetch data." });
        }
    }

}
