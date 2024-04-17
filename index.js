require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const {Client} = require('@googlemaps/google-maps-services-js');
const path = require("path"); // Assuming you've this installed for Google Maps

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
        if (!origin || /^https?:\/\/(localhost(:[0-9]+)?|127\.0\.0\.1:9292|(.+\.)*wisetap\.co\.uk)$/.test(origin)) {
            callback(null, true);
        }
        else {
            console.log(origin)
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
    client.textSearch({
        params: {
            query: req.query.search,
            location: 'uk',
            // fields: ["name", "business_status", "formatted_address", "geometry", "icon", "icon_mask_base_uri", "icon_background_color"],
            fields: ["name", "formatted_address", "icon", "photos"],
            key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000 // milliseconds
    })
        .then((r) => {
            if (r.data.results.length > 0) {
                const candidates = r.data.results.map(candidate => ({
                    name: candidate.name,
                    address: candidate.formatted_address,
                    icon: candidate.icon,
                    photos: candidate.photos
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
});

app.get('/api/google/photo', cors(corsOptions), async (req, res) => {
    const photoReference = req.query.photo_reference;
    if (!photoReference) {
        return res.status(400).send({ message: 'You must provide a photo reference.' });
    }

    const client = new Client({});
    try {
        const photoResponse = await client.placePhoto({
            params: {
                photoreference: photoReference,
                maxwidth: 400,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            responseType: 'stream' // Set response type to 'stream'
        });

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

    } catch (e) {
        console.error(e.response ? e.response.data.error_message : e.message);
        res.status(500).send({ message: 'An error occurred while fetching the photo.' });
    }
});


app.get('/api/facebook/find', cors(corsOptions), async (req, res) => {
    const query = req.query.search;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN; // The system user's access token

    if (!query) {
        return res.status(400).send({message: 'Query is required'});
    }

    const url = `https://graph.facebook.com/pages/search?q=Facebook&fields=id,name,location,link&access_token=956670609300440|58bf102280837908e05303510f297176`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data.data); // Send back the array of pages
    } catch (error) {
        console.error('Error searching Facebook API:', error);
        res.status(500).send({message: error.message});
    }
})

app.get('/policies/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'privacy-policy.html'));
});

app.get('/policies/data-deletion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data-deletion.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


module.exports = app;