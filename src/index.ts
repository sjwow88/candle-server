import './LoadEnv'; // Must be the first import
import app from '@server'; //@ 루트경로
import logger from '@shared/Logger';
import socketConnect from './LiveRatesConnect';


const SocketIO = require('socket.io');

// Start the server
const port = Number(process.env.PORT || 8081);
const server = app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

const io = SocketIO(server,{path: '/socket.io'});

var liveRates = new socketConnect();
io.on('connection', (socket:any) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error:any) => {
      console.error(error);
    });
    socket.on('reply', (data:any) => {
      console.log(data);
    });
    socket.interval = setInterval(() => {
      socket.emit('newss', liveRates.getDate());
    }, 1000);
  });
