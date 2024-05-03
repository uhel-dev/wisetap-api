import {Request, Response} from 'express';
import {LinkedinService} from "../services/linkedinService";

export class LinkedinController {
    private linkedinService: LinkedinService;

    constructor(linkedinService: LinkedinService
    ) {
        this.linkedinService = linkedinService;
    }

    public findLinkedinProfile = async (req: Request, res: Response) => {
        const { username } = req.query;
        if (!username) {
            return res.status(400).send({ message: 'You must provide valid snapchat username.' });
        }
        const data: any | null = await this.linkedinService.fetchLinkedinProfile(username);
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).send({ message: "Linkedin account doesn't exist or failed to fetch data." });
        }
    }

}
