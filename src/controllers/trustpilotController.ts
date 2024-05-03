import {Request, Response} from 'express';
import {TrustpilotService} from "../services/trustpilotService";
import {TrustpilotProfile} from "../types/TrustpilotProfileData";

export class TrustpilotController {
    private trustpilotService: TrustpilotService;

    constructor(trustpilotService: TrustpilotService) {
        this.trustpilotService = trustpilotService;
    }

    public findTrustpilotProfile = async (req: Request, res: Response) => {
        const { url } = req.query;
        if (!url) {
            return res.status(400).send({ message: 'You must provide a Trustpilot url.' });
        }
        const data: TrustpilotProfile | null = await this.trustpilotService.fetchTrustpilotData(url);
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).send({ message: "Account doesn't exist or failed to fetch data." });
        }
    }

}
