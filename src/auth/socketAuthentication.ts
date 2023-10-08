import {
  AccessTokenError,
  AuthFailureError,
  TokenExpiredError,
} from '../core/apiError';
import JWT from '../core/jwt';
import Utils from '../helpers/utils';
import KeystoreService from '../auth/services/keyStore';
import { getAccessToken, validateTokenData } from './authUtils';

export default async function (socket: any) {
  // Express headers are auto converted to lowercase
  socket.accessToken = getAccessToken(socket?.handshake?.headers?.authorization);
  try {
    const payload = await JWT.validate(socket.accessToken);
    validateTokenData(payload);
    const sub = Utils.decodeBase64String(payload.sub);

    const { user, keystore } = await KeystoreService.findForAuth(
      sub.id,
      payload.prm,
    );

    if (!(user && Object.keys(user)?.length)) {
      throw new AuthFailureError('User not registered!');
    }
    socket.user = {loginId : user.loginId};
    socket.keystore = keystore;

    if (!(keystore && Object.keys(keystore)?.length)) {
      throw new AuthFailureError('Invalid access token!');
    }
    return socket;
  } catch (e) {
    console.log('error in socket authentication -> ',e);
    if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
    throw e;
  }
}
