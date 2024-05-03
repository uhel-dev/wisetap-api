import express from 'express';
import cors from 'cors';
import {json, urlencoded} from 'body-parser';
import {corsOptions} from './config/corsOptions';
import {apiLimiter} from "./config/rateLimiterOptions";
import policiesRoutes from "../src/routes/policiesRoutes";
import trustpilotRoutes from "./routes/trustpilotRoutes";
import googleMapsRoutes from "./routes/googleMapsRoutes";
import whatsappRoutes from "./routes/whatsappRoutes";
import snapchatRoutes from "./routes/snapchatRoutes";
import linkedinRoutes from "./routes/linkedinRoutes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(apiLimiter);
app.use(cors(corsOptions));

app.use('/api/google', googleMapsRoutes);
// app.use('/api/facebook', facebookRoutes);
app.use('/api/trustpilot', trustpilotRoutes);
app.use('/api/linkedin', linkedinRoutes);
app.use('/api/snapchat', snapchatRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/policies', policiesRoutes);

export default app;

