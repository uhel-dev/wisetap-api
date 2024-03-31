require('dotenv').config();


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { Client } = require("@googlemaps/google-maps-services-js");


app.use(express.json());

// Example endpoint for autocomplete suggestions for business names in the UK
app.get('/api/autocomplete', (req, res) => {
    // Ensure that the query parameter exists
    if (!req.query.search) {
        return res.status(400).send({ message: 'You must provide a search query.' });
    }

    const client = new Client({});
    client.placeAutocomplete({
        params: {
            input: req.query.search,
            components: 'country:uk', // Restrict the search to the United Kingdom
            key: process.env.GOOGLE_MAPS_API_KEY // Replace with your actual API key
        },
        timeout: 1000 // milliseconds
    })
        .then((r) => {
            if (r.data.predictions.length > 0) {
                const predictions = r.data.predictions.map(prediction => ({
                    name: prediction.description, // Text description of the prediction
                    place_id: prediction.place_id // Google Place ID
                }));
                res.json(predictions);
            } else {
                res.status(404).send({ message: 'No autocomplete predictions found matching the query.' });
            }
        })
        .catch((e) => {
            console.log(e.response ? e.response.data.error_message : e.message);
            res.status(500).send({ message: 'An error occurred while fetching autocomplete predictions.' });
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
