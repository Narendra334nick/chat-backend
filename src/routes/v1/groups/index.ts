import express from "express";
import { SuccessResponse } from "../../../core/apiResponses";
import AsyncHandler from "../../../core/asyncHandler";
import { ProtectedRequest } from "../../../types/app-request";
import authentication from "../../../auth/authentication";
import chatGroupServices from "./services";

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get(
	"/",
	AsyncHandler(async (req: ProtectedRequest, res) => {
    const [data] = await chatGroupServices.getGroups(req); 
		return new SuccessResponse("Group fetched successfully !!", data).send(res);
	})
);


router.post(
	"/create",
	AsyncHandler(async (req: ProtectedRequest, res) => {
    const [data] = await chatGroupServices.createGroup(req);
		return new SuccessResponse("Group created successfully!!", data).send(res);
	})
);

export default router;
