import chatSocket from './src/routes/sockets/chat/chat';
import VerifyTokenSocket from './src/auth/socketAuthentication';

const _socket = (io: any) => {
  io.use(async function (socket: any, next: any) {
    // token authorization
    if (socket.handshake.headers?.['authorization']) {
      const newSocket = await VerifyTokenSocket(socket);
      if (newSocket) {
        socket['user'] = newSocket.user;
        next();
      } else {
        next(new Error('Authorization Error!'));
      }
    } else {
      next(new Error('Authorization Error!'));
    }
  });
  chatSocket(io);
};
export default _socket;
