import express from "express";
import login from '../v1/login/index';
import groups from '../v1/groups/index';

const router = express.Router();

router.use("/login", login);
router.use("/groups",groups);

export default router;