import express, { Request, Response, NextFunction } from "express";
import routesV1 from './src/routes/v1';
import cors from 'cors';

const app = express();


// Enable CORS for all routes
const corsOptions = {
  origin: '*', // Replace with your allowed origin(s) or use a function to dynamically determine the origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies and other credentials in the CORS request if applicable
  optionsSuccessStatus: 204, // HTTP status code to send for successful OPTIONS requests
};
app.use(cors());
// Body parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routes
app.use('/v1',routesV1);

export default app;