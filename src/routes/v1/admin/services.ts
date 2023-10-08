import { ProtectedRequest } from '../../../types/app-request';
import querySync from '../../../database/dbHandler';
import Proc from '../../../database/model/mySqlProcedure';

export default class adminOperations {
  
  public static async createUser(req: ProtectedRequest) {
    const reqData = {
      reqtype: 'createUser',
      ...req.params,
      ...req.body,
      ...req.query,
      ...req.user
    };
    const response = await querySync(Proc.admin, reqData);
    return response;
  }

  public static async updateUser(req: ProtectedRequest) {
    const reqData = {
      reqtype: 'updateUser',
      ...req.params,
      ...req.body,
      ...req.query,
      ...req.user
    };
    const response = await querySync(Proc.admin, reqData);
    return response;
  }

  public static async getUser(req:ProtectedRequest) {
    const reqData = {
      reqtype: 'getUser',
      ...req.params,
      ...req.body,
      ...req.query,
      ...req.user
    };
    const response = await querySync(Proc.admin, reqData);
    return response;
  }
}
