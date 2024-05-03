"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinController = void 0;
class LinkedinController {
    constructor(linkedinService) {
        this.findLinkedinProfile = async (req, res) => {
            const { username } = req.query;
            if (!username) {
                return res.status(400).send({ message: 'You must provide valid snapchat username.' });
            }
            const data = await this.linkedinService.fetchLinkedinProfile(username);
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).send({ message: "Linkedin account doesn't exist or failed to fetch data." });
            }
        };
        this.linkedinService = linkedinService;
    }
}
exports.LinkedinController = LinkedinController;
