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
let roomExists = false;
let roomId;


io.on('connection', (socket) => {

    socket.on('newPlayer', data => {
        console.log("New client connected, with id: " + socket.id);
        players[socket.id] = data;

        //Join test room when connect
        if(roomExists) {
            socket.join(roomId);
            console.log(roomId);
        }
        
        io.emit('updatePlayers', players);
    });

    if(!roomExists) {   
        socket.on('create', function(room) {
            socket.join(room);
            console.log("Room: " + room);
            console.log("Players: " + players);
            roomExists = true;
            roomId = room;
            io.to(roomId).emit('createMap');
        });
    }

    socket.on('disconnect', (reason) => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            socket.connect();
          }
          // else the socket will automatically try to reconnect
    });

});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});