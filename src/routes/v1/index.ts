import express from "express";
const router = express.Router();
router.use("/login", (req: any, res: any) => {
	console.log("login working");
});

export default router;