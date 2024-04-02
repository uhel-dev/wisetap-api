require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const {Client} = require('@googlemaps/google-maps-services-js'); // Assuming you've this installed for Google Maps

const app = express();

// Rate Limiter Middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// CORS Middleware for domain restriction
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || /^https?:\/\/(localhost|.*\.wisetap\.co\.uk)$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

// Apply the rate limiter to all requests
app.use(apiLimiter);

// Apply CORS middleware to your route
app.get('/api/google/find', cors(corsOptions), (req, res) => {
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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
