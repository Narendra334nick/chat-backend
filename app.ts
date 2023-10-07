import express, { Request, Response, NextFunction } from "express";
import routesV1 from './src/routes/v1';
const app = express();


// Body parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routes
app.use('/v1',routesV1);

export default app;