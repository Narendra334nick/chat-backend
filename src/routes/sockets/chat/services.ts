import { ProtectedRequest } from '../../../types/app-request';
import querySync from '../../../database/dbHandler';
import Proc from '../../../database/model/mySqlProcedure';

export default class chatService {
  
  public static async saveMessage(req:any) {
    const reqData = {
      reqtype: 'saveMessage',
      ...req
    };
    const response = await querySync(Proc.groupChats, reqData);
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
    const response = await querySync(Proc.groupChats, reqData);
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
    const response = await querySync(Proc.groupChats, reqData);
    return response;
  }
}
