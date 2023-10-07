import app from './app';
import { createServer } from 'http';
import config from './src/config/config';

const httpServer = createServer(app);
const port = config.server.port;

const server = httpServer.listen(port,()=>{
  console.log(`server running on port : ${port}`);
})
.on('error',(e)=>{
  console.log('e -->> ',e);
})