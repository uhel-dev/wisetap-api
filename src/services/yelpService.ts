import * as dotenv from 'dotenv';

dotenv.config();

export class YelpService {


    public async fetchYelpData(term: any) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer Cz_Z-2x_aBS8tK3pILVoQwe7oYwsBw0SDaPibtOymp2PybwXo0Qobh4hWqmJQ3p5wf4EipE-oRZ3DtM1Zs9Wt8Or97iDKjZggohraR-bF-hUOQHepxm9aBPLStQ3ZnYx'
                }
            };

            const {businesses} = await fetch(`https://api.yelp.com/v3/businesses/search?location=United%20Kingdom&term=${term}}&sort_by=best_match&limit=20`, options)
                .then(response => response.json())
                .then(response => {
                    return response
                })
                .catch(err => console.error(err));
            return businesses.map((business: any) => {
                const { alias, name, image_url, display_phone } = business
                return {
                    alias,
                    name,
                    image_url,
                    display_phone
                }
            })

        } catch (error) {
            console.error('Error fetching Yelp data:', error);
            return null;
        }
    }

}
