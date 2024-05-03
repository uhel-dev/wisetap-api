import {Request, Response} from 'express';
import {TrustpilotService} from "../services/trustpilotService";
import {TrustpilotProfile} from "../types/TrustpilotProfileData";
import {InstagramService} from "../services/instagramService";
import {SnapchatService} from "../services/snapchatService";

export class SnapchatController {
    private snapchatService: SnapchatService;

    constructor(snapchatService: SnapchatService) {
        this.snapchatService = snapchatService;
    }

    public findSnapchatProfile = async (req: Request, res: Response) => {
        const { username } = req.query;
        if (!username) {
            return res.status(400).send({ message: 'You must provide valid snapchat username.' });
        }
        const data: any | null = await this.snapchatService.fetchSnapchatProfile(username);
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).send({ message: "Snapchat account doesn't exist or failed to fetch data." });
        }
    }

}
