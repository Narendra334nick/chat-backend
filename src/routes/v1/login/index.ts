import express from "express";
import { SuccessResponse } from "../../../core/apiResponses";
import AsyncHandler from "../../../core/asyncHandler";
import { ProtectedRequest } from "../../../types/app-request";
import loginOperations from "./services";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../../core/apiError";

const router = express.Router();

router.post(
	"/basic",
	AsyncHandler(async (req: ProtectedRequest, res) => {
		console.log(req.body);
		const { email, password } = req.body;
		
		const [[user]] = await loginOperations.findUserByEmail(email);
    
    if (!user) throw new BadRequestError("User not exists/Create account !!");
    const match = await bcrypt.compare(password, user.password);
		if(!match) throw new BadRequestError("Wrong password !!!");
		//const passwordHash = await bcrypt.hash(req.body.password, 10);
    //const userData = Utils.sendLoginData(user);
    //const tokens = await getToken(user);
		const [[data]] = await loginOperations.getLoginDetails(req);
		return new SuccessResponse("Login details fetched successfully.", data).send(res);
	})
);

export default router;
