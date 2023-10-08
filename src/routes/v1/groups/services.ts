import { ProtectedRequest } from '../../../types/app-request';
import querySync from '../../../database/dbHandler';
import Proc from '../../../database/model/mySqlProcedure';

export default class chatGroupServices {
  
  public static async createGroup(req: ProtectedRequest) {
    const reqData = {
      reqtype: 'createGroup',
      ...req.params,
      ...req.body,
      ...req.query,
      ...req.user
    };
    const response = await querySync(Proc.groupChats, reqData);
    return response;
  }

  public static async getGroups(req:ProtectedRequest) {
    const reqData = {
      reqtype: 'getGroups',
      ...req.params,
      ...req.body,
      ...req.query,
      ...req.user
    };
    console.log('reqdaat',reqData);
    const response = await querySync(Proc.groupChats, reqData);
    return response;
  }
}
