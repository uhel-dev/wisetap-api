// Import the necessary type definitions and the cors package
import { CorsOptions } from 'cors';

// Define your CORS options
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // // Allow requests with no origin (like mobile apps or curl requests)
        // if (!origin) return callback(null, true);
        //
        // // Define a list of allowed origins
        // const allowedOrigins = [
        //     'http://localhost:3000',
        //     'http://127.0.0.1:9292',
        //     /\.wisetap\.co\.uk$/,
        //     /(.+\.)*wisetap\.co\.uk/
        // ];
        //
        // // Check if the origin is in the allowed list
        // if (allowedOrigins.some((allowedOrigin) => {
        //     return typeof allowedOrigin === 'string' ? allowedOrigin === origin : allowedOrigin.test(origin);
        // })) {
        //     return callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }

        if (!origin || /^https?:\/\/(localhost(:[0-9]+)?|127\.0\.0\.1:9292|(.+\.)*wisetap\.co\.uk)$/.test(origin)) {
            callback(null, true);
        }
        else {
            console.log(origin)
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

export { corsOptions };

