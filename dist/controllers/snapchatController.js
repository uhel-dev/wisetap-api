"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapchatController = void 0;
class SnapchatController {
    constructor(snapchatService) {
        this.findSnapchatProfile = async (req, res) => {
            const { username } = req.query;
            if (!username) {
                return res.status(400).send({ message: 'You must provide valid snapchat username.' });
            }
            const data = await this.snapchatService.fetchSnapchatProfile(username);
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).send({ message: "Snapchat account doesn't exist or failed to fetch data." });
            }
        };
        this.snapchatService = snapchatService;
    }
}
exports.SnapchatController = SnapchatController;
