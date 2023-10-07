import express from 'express';
import { SuccessResponse } from '../../../core/apiResponses';
import AsyncHandler from '../../../core/asyncHandler';
import { ProtectedRequest } from '../../../types/app-request';
import loginOperations from './services';

const router = express.Router(); 


router.post(
  '/basic',
  AsyncHandler(async (req: ProtectedRequest, res) => {
    console.log('working fine login',req.body);
    const [data] = await loginOperations.getLoginDetails(req);
    return new SuccessResponse('Data fetched successfully.', data).send(res);
  }),
);

export default router;