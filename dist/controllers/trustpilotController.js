"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustpilotController = void 0;
class TrustpilotController {
    constructor(trustpilotService) {
        this.findTrustpilotProfile = async (req, res) => {
            const { url } = req.query;
            if (!url) {
                return res.status(400).send({ message: 'You must provide a Trustpilot url.' });
            }
            const data = await this.trustpilotService.fetchTrustpilotData(url);
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).send({ message: "Account doesn't exist or failed to fetch data." });
            }
        };
        this.trustpilotService = trustpilotService;
    }
}
exports.TrustpilotController = TrustpilotController;
