import { ProtectedRequest } from "../../../types/app-request";
import { keys } from "../../../constant/socktKeys";
import chatService from "./services";

const chatSocket = (io: any) => {
  io.on('connection', function (socket: any) {
    console.log(
      '------------------------CHAT---CONNECTION---SUCCESSFULL--------------------------------------',
    );
    // recieve message from client
    socket.on(keys.send_message, async (data:any) => {
      const newReq: ProtectedRequest = {
        ...socket.body,
        ...socket.user,
        ...data
      };
      const [res] = await chatService.saveMessage(newReq);
      io.sockets.emit(keys.send_message_ack, res);
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });
};

export default chatSocket;
