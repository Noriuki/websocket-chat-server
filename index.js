import webSocketServer from "websocket";
import http from 'http';

const server = http.createServer();
server.listen(8080);
console.log('server is running!');

const ws = new webSocketServer.server({
  httpServer: server
});

ws.on('request', request => {
  const connection = request.accept(null, request.origin);

  connection.on('message', msg => {
    ws.broadcastUTF(msg.utf8Data)
  })
  
  connection.on('close', () => {
    console.log('Client has disconnected.')
  })
})