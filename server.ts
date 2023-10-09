import app from './app';
import { createServer } from 'http';
import config from './src/config/config';
import _socket from './socket';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './src/types/socket-types';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const port = config.server.port;

const io = new Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: `*`,
    methods: ['GET', 'POST'],
  },
});

_socket(io);

const server = httpServer.listen(port,()=>{
  console.log(`server running on port : ${port}`);
})
.on('error',(e)=>{
  console.log('e -->> ',e);
})