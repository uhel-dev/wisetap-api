import {Request, Response} from 'express';
import {WhatsappService} from "../services/whatsappService";

export class WhatsappController {
    private whatsappService: WhatsappService;

    constructor(whatsappService: WhatsappService) {
        this.whatsappService = whatsappService;
    }

    public findNumber = async (req: Request, res: Response) => {
        try {
            const { search } = req.query;
            // if (!search) {
            //     return res.status(400).json({ message: 'You must provide a search query.' });
            // }
            // const results = await this.whatsappService.findPlaces(search.toString()).then((r) => {
            //     if (r.data.results.length > 0) {
            //         const candidates: GoogleCandidate[] = r.data.results.map((candidate: any) => ({
            //             name: candidate.name,
            //             address: candidate.formatted_address,
            //             icon: candidate.icon,
            //             photos: candidate.photos
            //         }));
            //         res.json(candidates);
            //     } else {
            //         res.status(404).send({ message: 'No autocomplete predictions found matching the query.' });
            //     }
            // })
            //     .catch((e) => {
            //         console.log(e.response ? e.response.data.error_message : e.message);
            //         res.status(500).send({ message: 'An error occurred while fetching autocomplete predictions.' });
            //     });
            // res.json(results);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}
