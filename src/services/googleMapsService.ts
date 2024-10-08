import {
    Client, PlaceAutocompleteResponse,
    PlacePhotoRequest,
    PlacePhotoResponse,
    TextSearchRequest,
    TextSearchResponse,
    PlaceAutocompleteRequest,
    PlaceAutocompleteResponseData,
} from '@googlemaps/google-maps-services-js';
import * as dotenv from 'dotenv';
dotenv.config();

export class GoogleMapsService {
    private client: Client;

    constructor() {
        this.client = new Client({});
    }

    public findPlacesV2(query: string){
        return this.client.placeAutocomplete({
            params: {
                input: query,
                components: ['country:uk'],
                key: process.env.GOOGLE_MAPS_API_KEY!!
            }
        })
    }

    public findPlaces(query: string): Promise<TextSearchResponse> {
        const request: TextSearchRequest = {
            params: {
                query: query,
                location: 'uk',
                key: process.env.GOOGLE_MAPS_API_KEY!!,
            },
            timeout: 1000
        }
        return this.client.textSearch(request)
    }

    public fetchGoogleProfilePhoto(photoReference: any): Promise<PlacePhotoResponse> {
        const request: PlacePhotoRequest = {
            params: {
                photoreference: photoReference,
                maxwidth: 400,
                key: process.env.GOOGLE_MAPS_API_KEY!!,
            },
            responseType: 'stream' // Set response type to 'stream'
        }
        return this.client.placePhoto(request);
    }
}
