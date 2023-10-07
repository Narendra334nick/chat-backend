import { ProtectedRequest } from '../../../types/app-request';
import querySync from '../../../database/dbHandler';
import Proc from '../../../database/model/mySqlProcedure';

export default class login {
  
  public static async getLoginDetails(req: ProtectedRequest) {
    const reqData = {
      reqtype: 'getLoginDetails',
      ...req.params,
      ...req.body,
      ...req.query,
    };
    const response = await querySync(Proc.login, reqData);
    return response;
  }

  public static async appVersion(req: ProtectedRequest) {
    const reqData = {
      reqtype: 'getAppVersion',
      ...req.params,
      ...req.body,
      ...req.query,
    };
    const [response] = await querySync(Proc.login, reqData);
    return response;
  }
}
