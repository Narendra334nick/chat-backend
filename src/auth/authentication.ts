import express from 'express';
import { ProtectedRequest } from '../types/app-request';
import {
  AuthFailureError,
  AccessTokenError,
  TokenExpiredError,
} from '../core/apiError';
import JWT from '../core/jwt';
//import { getAccessToken, validateTokenData } from '../auth/authUtils';
import asyncHandler from '../core/asyncHandler';
//import KeystoreService from '@app/services/Keystore';
import Utils from '../helpers/utils';
//import UserService from '../services/Users';
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
        sub.id,
        payload.prm,
      );

      if (!(user && Object.keys(user)?.length)) {
        throw new AuthFailureError('User not registered!');
      }
      req.user = Utils._getUserData(user);

      //current role id of login user
      req.user.currentRoleId = sub?.currentRole ? sub.currentRole : sub.role;

      const roleData = await ApiKeyService.getMasterByID(
        Number(req?.user?.currentRoleId),
      );

      UserService.saveFcmToken(req);

      if (
        roleData?.configcode !== 'system-role' ||
        !(
          +roleData?.id === +req.user.role_id ||
          +roleData?.id === Number(req.user.extra_role_id)
        )
      ) {
        throw new AuthFailureError();
      }

      if (!(keystore && Object.keys(keystore)?.length)) {
        throw new AuthFailureError('Invalid access token!');
      }

      req.currentRoleCode = roleData?.configvalue1;
      req.user.currentRoleCode = roleData?.configvalue1;
      req.keystore = keystore;

      return next();
    } catch (e) {
      logger.error(e);
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
