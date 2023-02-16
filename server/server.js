import { createServer } from "node:http";
import { Server } from "socket.io";
import express from 'express';

const app = express();
const httpServer = createServer(app);

const countriesDict = {};
const players = {};
var playersLength;

let mapCreated = false;
let roomId;

let countriesImgList;
let contriesColorList;

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

    socket.on('new-player', (playerNickname, playerRoomName) => {
        console.log("New client connected, with id: " + socket.id);
        var randomElements = getRandomColorAndGoal();

        players[socket.id] = {
            name: playerNickname,
            room: playerRoomName,
            color: randomElements.color,
            goal: randomElements.goal
        };

        socket.join(playerRoomName);

        playersLength = Object.keys(players).length;

        //if => 3 create map when admin started playersLength
        //Room ready
        if(!mapCreated) {
            console.log("Map created");
            io.emit('create-map', mapCreated, countriesDict);
            mapCreated = true;
        }
        
        else {
            var countriesColorOrder = Object.keys(countriesDict).map(function(key){
                return countriesDict[key];
            });

            io.emit('create-map', mapCreated, countriesColorOrder);
        }
    });

    socket.on('change-country-color', dict => {
        //Saved in dictionary variable to emit 'map-update' to all clients
        countriesDict[dict.country] = dict.color;
        io.emit('update-map', dict.country, dict.color);
    });

    socket.on('disconnect', (reason) => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            socket.connect();
        }

        io.to("room1").emit('serverToClient', socket.id);
          // else the socket will automatically try to reconnect
    });

});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});

function getRandomColorAndGoal() {
    
    const color = [
        "Red", "Blue", "Yellow", "Gray", "Green", "Purple"
    ];

    const goal = [
        "Matar ciano", "Mata cinza", "Matar red"
    ];

    const randomColor = Math.floor(Math.random() * color.length);
    const randomGoal = Math.floor(Math.random() * goal.length);

    return {
        "color": color[randomColor],
        "goal": goal[randomGoal]
    }
}