import express from "express";
import { SuccessResponse } from "../../../core/apiResponses";
import AsyncHandler from "../../../core/asyncHandler";
import { ProtectedRequest } from "../../../types/app-request";
import authentication from "../../../auth/authentication";
import adminServiec from "./services";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { BadRequestError } from "../../../core/apiError";

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
	"/",
	AsyncHandler(async (req: ProtectedRequest, res) => {
    const uuid = uuidv4();
    req.body.uuid = uuid;
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHash;
		const [data] = await adminServiec.createUser(req);
		return new SuccessResponse("user created successfully", data).send(res);
	})
);

router.put(
	"/updateUser",
	AsyncHandler(async (req: ProtectedRequest, res) => {
    if(!req?.body?.id) throw new BadRequestError('id is required field !!');
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHash;
		const [data] = await adminServiec.updateUser(req);
		return new SuccessResponse("user updated successfully", data).send(res);
	})
);

router.get(
	"/user",
	AsyncHandler(async (req: ProtectedRequest, res) => {
		const [data] = await adminServiec.getUser(req);
		return new SuccessResponse("user fetched successfully", data).send(res);
	})
);

export default router;