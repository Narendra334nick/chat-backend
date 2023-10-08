import querySync from '../../database/dbHandler';
import proc from '../../database/model/mySqlProcedure';

export default class KeystoreService {
  public static async create(
    loginId: string,
    accessTokenKey: string,
    refreshTokenKey: string,
  ) {
    const [result] = await querySync(proc.keystore, {
      reqtype: 'create',
      loginId: loginId,
      accessTokenKey,
      refreshTokenKey,
    });
    console.log('results',result);
  }
}

