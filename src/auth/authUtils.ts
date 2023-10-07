
import { randomBytes } from 'crypto';
import JWT, { JwtPayload } from '../core/jwt';
import User from '../database/model/user';
import { Tokens } from '../types/app-request';
import { AuthFailureError, InternalError } from '../core/apiError';
import Utils from '../helpers/utils';
import config from '../config/config';
const { tokenInfo } = config;


export const createTokens = async (
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<Tokens> => {
  const encodeUser = Utils.encodeToBase64({
    id: user.id,
    uuid: user.uuid,
    email: user.email,
  });
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      encodeUser,
      accessTokenKey,
      tokenInfo.accessTokenValidityDays,
    ),
  );

  if (!accessToken) throw new InternalError();

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      encodeUser,
      refreshTokenKey,
      tokenInfo.refreshTokenValidityDays,
    ),
  );

  if (!refreshToken) throw new InternalError();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};

export const getToken = (user: User) => {
  const accessTokenKey = randomBytes(64).toString('hex');
  const refreshTokenKey = randomBytes(64).toString('hex');
  //KeystoreService.create(user._id, accessTokenKey, refreshTokenKey);
  return createTokens(user, accessTokenKey, refreshTokenKey);
};