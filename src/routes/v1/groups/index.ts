import express from "express";
import { SuccessResponse } from "../../../core/apiResponses";
import AsyncHandler from "../../../core/asyncHandler";
import { ProtectedRequest } from "../../../types/app-request";

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
//router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
	"/",
	AsyncHandler(async (req: ProtectedRequest, res) => {
		console.log('req.body',req.body);
		return new SuccessResponse("Group testing!!", []).send(res);
	})
);

export default router;
