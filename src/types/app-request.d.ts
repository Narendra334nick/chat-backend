import { Request, Response } from 'express';
import Keystore from '@app/database/model/Keystore';
import User from '@app/database/model/User';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface CacheResponse extends Response {
  cache: (data: string, time?: number, message?: string) => void;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
