"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramController = void 0;
class InstagramController {
    constructor(instagramService) {
        this.findInstagramProfile = async (req, res) => {
            const { username } = req.query;
            if (!username) {
                return res.status(400).send({ message: 'You must provide valid instagram username.' });
            }
            const data = await this.instagramService.fetchWithPupeeter(username);
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).send({ message: "Account doesn't exist or failed to fetch data." });
            }
        };
        this.instagramService = instagramService;
    }
}
exports.InstagramController = InstagramController;
