import { createServer } from "node:http";
import { Server } from "socket.io";
import express from 'express';

const app = express();
const httpServer = createServer(app);

const players = {};
var playersLength;

const countriesDict = {};

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
        if(playersLength == 1 && !mapCreated) {
            console.log("Map created");
            io.emit('create-map', mapCreated, countriesDict);
            mapCreated = true;
            //colors: contriesColorList
        }
        
        else {
            var countriesColorOrder = Object.keys(countriesDict).map(function(key){
                return countriesDict[key];
            });

            console.log(countriesColorOrder);

            io.emit('create-map', mapCreated, countriesColorOrder);
        }
    });

    socket.on('change-country-color', dict => {
        //Saved in dictionary variable to emit 'map-update' to all clients
        countriesDict[dict.country] = dict.color;
        io.emit('update-map', dict.country, dict.color);
    });

    
    /*socket.on('mapElements', data => {
        countriesImgList = data.countries;
        contriesColorList = data.colors;
    });*/

    /*if(!roomExists) {   
        socket.on('create', function(room) {
            socket.join(room);
            console.log("Room: " + room);
            console.log("Player: " + players);

            //io.to(roomId).emit('createMap', roomExists);
            io.emit('createMap', roomExists);
            
            roomExists = true;
            roomId = room;
        });
    }*/

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