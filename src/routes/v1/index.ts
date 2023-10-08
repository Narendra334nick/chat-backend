import express from "express";
import login from '../v1/login/index';
import groups from '../v1/groups/index';
import admin from '../v1/admin';

const router = express.Router();

router.use("/login", login);
router.use("/groups",groups);
router.use("/admin",admin);

export default router;