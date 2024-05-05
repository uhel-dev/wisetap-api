import * as dotenv from 'dotenv';
import sdk from '@api/yelp-developers';

dotenv.config();

export class YelpService {
    public async fetchYelpData(term: any) {
        try {
            sdk.auth(`Bearer ${process.env.YELP_API_KEY}`);
            const businesses = await sdk.v3_business_search({
                location: 'united%20kingdom',
                term: term,
                sort_by: 'best_match',
                limit: 20
            })
                .then(({ data }) => {
                    return data
                })
                .catch(err => console.error(err));
            return businesses
        } catch (error) {
            console.error('Error fetching Yelp data:', error);
            return null;
        }
    }

}
