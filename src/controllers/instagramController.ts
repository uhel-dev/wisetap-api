import {Request, Response} from 'express';
import {TrustpilotService} from "../services/trustpilotService";
import {TrustpilotProfile} from "../types/TrustpilotProfileData";
import {InstagramService} from "../services/instagramService";

export class InstagramController {
    private instagramService: InstagramService;

    constructor(instagramService: InstagramService) {
        this.instagramService = instagramService;
    }

    public findInstagramProfile = async (req: Request, res: Response) => {
        const { username } = req.query;
        if (!username) {
            return res.status(400).send({ message: 'You must provide valid instagram username.' });
        }
        const data: any | null = await this.instagramService.fetchWithPupeeter(username);
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).send({ message: "Account doesn't exist or failed to fetch data." });
        }
    }

}
