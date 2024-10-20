import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routeModules from "./routes";

dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from "./middleware/passport";
import httpLogger from "./middleware/http-logger";
import cookieParser from "cookie-parser";

import { errorHandler } from "./helpers/errorHandler";
import { loadConfigVariables } from "./config";

// LOAD ENVIRONMENT VARIABLES
loadConfigVariables();

const app: Express = express();

// Custom Middleware logger
app.use(httpLogger);

// Middleware
// app.use(cors({ origin: '*' }));
const corsOptions = {
    origin: 'http://localhost:5173', // Specify the allowed origin
    credentials: true, // Enable credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(cookieParser());

// passport middleware
app.use(passport);

routeModules(app);

// Global error handling middleware
app.use(errorHandler);

export default app;