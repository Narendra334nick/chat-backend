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
    console.log('key store created !!',result);
  }


  public static async findForAuth(loginId: string, key: string): Promise<any> {
    const [res1, res2] = await querySync(proc.keystore, {
      reqtype: 'getForAuth',
      loginId,
      key,
    });
    return { user: res1?.[0], keystore: res2?.[0] };
  }
}

