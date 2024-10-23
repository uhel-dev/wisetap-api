import { Request, Response } from 'express';
import { GoogleMapsService } from '../services/googleMapsService';
import {GoogleCandidate} from "../types/GoogleCandidate";
import {PlaceAutocompleteResponse} from "@googlemaps/google-maps-services-js";

export class GoogleMapsController {
    private googleMapsService: GoogleMapsService;

    constructor(googleMapsService: GoogleMapsService) {
        this.googleMapsService = googleMapsService;
    }

    public findPlacesV2 = async (req: Request, res: Response) => {

        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ message: 'You must provide a search query.' });
        }

        const results = await this.googleMapsService.findPlacesV2(search.toString())
            .then((response: PlaceAutocompleteResponse) => {
                if(response.data.status === 'ZERO_RESULTS') {
                    res.status(404).send({ message: 'No autocomplete predictions found matching the query.' });
                }

                if (response.data.status === 'OK') {
                    const predictions = response.data.predictions;

                    predictions.forEach(prediction => {
                        console.log(prediction.description);
                    });
                    res.json(predictions)
                }
            }).catch((e) => {
                res.status(404).send({ message: 'Error fetching predictions', error: e});
            })
    }

    public findPlaces = async (req: Request, res: Response) => {
        try {
            const { search } = req.query;
            if (!search) {
                return res.status(400).json({ message: 'You must provide a search query.' });
            }
            const results = await this.googleMapsService.findPlaces(search.toString()).then((r) => {
                if (r.data.results.length > 0) {
                    const candidates: GoogleCandidate[] = r.data.results.map((candidate: any) => ({
                        name: candidate.name,
                        address: candidate.formatted_address,
                        icon: candidate.icon,
                        photos: candidate.photos,
                        candidateId: candidate.place_id,
                        reviewLink: "https://search.google.com/local/writereview?placeid=" + candidate.place_id
                    }));
                    res.json(candidates);
                } else {
                    res.status(404).send({ message: 'No autocomplete predictions found matching the query.' });
                }
            })
                .catch((e) => {
                    console.log(e.response ? e.response.data.error_message : e.message);
                    res.status(500).send({ message: 'An error occurred while fetching autocomplete predictions.' });
                });
            res.json(results);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    public fetchGoogleProfilePhoto = async (req: Request, res: Response) => {
        const photoReference = req.query.photo_reference;
        if (!photoReference) {
            return res.status(400).send({ message: 'You must provide a photo reference.' });
        }
        try {
            const photoResponse = await this.googleMapsService.fetchGoogleProfilePhoto(photoReference)

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
        catch (e: any) {
            console.error(e.response ? e.response.data.error_message : e.message);
            res.status(500).send({ message: 'An error occurred while fetching the photo.' });
        }
    }
}
