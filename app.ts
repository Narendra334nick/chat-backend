import express, { Request, Response, NextFunction } from "express";
import routesV1 from './src/routes/v1';
const app = express();

// routes
app.use('/v1',routesV1);

export default app;