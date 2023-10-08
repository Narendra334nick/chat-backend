import express from 'express';
import { ProtectedRequest } from '../types/app-request';
import {
  AuthFailureError,
  AccessTokenError,
  TokenExpiredError,
} from '../core/apiError';
import JWT from '../core/jwt';
import asyncHandler from '../core/asyncHandler';
import KeystoreService from '../auth/services/keyStore';
import Utils from '../helpers/utils';
import { getAccessToken , validateTokenData } from './authUtils';
const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    // Express headers are auto converted to lowercase
    req.accessToken = getAccessToken(req.headers.authorization);
    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);
      const sub = Utils.decodeBase64String(payload.sub);
      const { user, keystore } = await KeystoreService.findForAuth(
        sub.id, // login id
        payload.prm,
      );

      if (!(user && Object.keys(user)?.length)) {
        throw new AuthFailureError('User not registered!');
      }
      req.user = {loginId : user.loginId};
      req.keystore = keystore;

      if (!(keystore && Object.keys(keystore)?.length)) {
        throw new AuthFailureError('Invalid access token!');
      }

      return next();
    } catch (e) {
      console.log("e in authentication -->>",e);
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
