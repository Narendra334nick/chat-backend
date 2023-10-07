import express from "express";
import login from '../v1/login/index';

const router = express.Router();

router.use("/login", login);

export default router;