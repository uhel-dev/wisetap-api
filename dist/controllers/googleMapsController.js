"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapsController = void 0;
class GoogleMapsController {
    constructor(googleMapsService) {
        this.findPlaces = async (req, res) => {
            try {
                const { search } = req.query;
                if (!search) {
                    return res.status(400).json({ message: 'You must provide a search query.' });
                }
                const results = await this.googleMapsService.findPlaces(search.toString()).then((r) => {
                    if (r.data.results.length > 0) {
                        const candidates = r.data.results.map((candidate) => ({
                            name: candidate.name,
                            address: candidate.formatted_address,
                            icon: candidate.icon,
                            photos: candidate.photos,
                            candidateId: candidate.place_id
                        }));
                        res.json(candidates);
                    }
                    else {
                        res.status(404).send({ message: 'No autocomplete predictions found matching the query.' });
                    }
                })
                    .catch((e) => {
                    console.log(e.response ? e.response.data.error_message : e.message);
                    res.status(500).send({ message: 'An error occurred while fetching autocomplete predictions.' });
                });
                res.json(results);
            }
            catch (e) {
                res.status(500).json({ message: e.message });
            }
        };
        this.fetchGoogleProfilePhoto = async (req, res) => {
            const photoReference = req.query.photo_reference;
            if (!photoReference) {
                return res.status(400).send({ message: 'You must provide a photo reference.' });
            }
            try {
                const photoResponse = await this.googleMapsService.fetchGoogleProfilePhoto(photoReference);
                // Set the content type of the response depending on the photo type received
                res.set('Content-Type', 'image/jpeg');
                photoResponse.data.on('end', () => {
                    // When the stream has finished being read
                });
                photoResponse.data.on('error', () => {
                    res.status(500).send({ message: 'Error streaming the photo.' });
                });
                // Pipe the stream to the response
                photoResponse.data.pipe(res);
            }
            catch (e) {
                console.error(e.response ? e.response.data.error_message : e.message);
                res.status(500).send({ message: 'An error occurred while fetching the photo.' });
            }
        };
        this.googleMapsService = googleMapsService;
    }
}
exports.GoogleMapsController = GoogleMapsController;
