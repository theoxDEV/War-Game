import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';

const app = express();
const httpServer = createServer(app);

//Adding CORS - https://socket.io/docs/v4/handling-cors/#cors-header-access-control-allow-origin-missing
const io = new Server(httpServer, { 
    cors: {
        origin: "http://127.0.0.1:5500"
    }
 });

 app.get('/', (req, res) => {
    res.send('Hello world');
  });


io.on('connection', (socket) => {
    socket.on('clientToServer', (data) => {
        console.log('a user connected');
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.emit('serverToClient', 'Hello client');
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});