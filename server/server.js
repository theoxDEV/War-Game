import { createServer } from "node:http";
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

let players = [];


io.on('connection', (socket) => {
    socket.on('newPlayer', (data) => {
        console.log('user connected');
        console.log(players);
        players[socket.id] = data;
        io.emit('updatePlayers', players);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
    
        socket.emit('serverToClient', `${socket.id}`);
    });

});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});