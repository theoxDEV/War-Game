import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import createGame from "../game.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const httpServer = createServer(app);

const game = createGame();
var players = [];

/* TURN BASED*/
let current_socket = 0;
let current_turn = 0;
let timeOut;
let _turn = 0;
const MAX_WAITING = 20000;

/* COUNTRY ITERATOR*/
var country_iterator = 0;

var roomExists = false;
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
    res.send('<h1>Hello world</h1>')
});

app.get("/lobby", (req, res) => {
    res.sendFile(path.join(__dirname, '/../../public/', 'lobby.html'))
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, '/../../public/', 'map.html'))
});

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});


io.on('connection', (socket) => {

    socket.on('new-player', (playerNickname, playerRoomName) => {
        const playerId = socket.id;

        game.addPlayer({
            playerId: playerId, 
            playerNickname: playerNickname, 
            playerRoomName: playerRoomName
        });

        roomExists = io.sockets.adapter.rooms.has(playerRoomName);
        socket.join(playerRoomName);

        io.to(playerRoomName).emit('setup', game, roomExists);
    })


    socket.on('create-game', (room) => {
        roomId = room;
        io.to(socket.id).emit('create-map');
    })


    socket.on('set-game-state', (gameInitialState) => {
        let countries = gameInitialState.state.countries;

        const keys = Object.keys(countries);

        keys.forEach((key, index) => {
            let country = countries[key];

            game.setCountry({
                name: country.name,
                color: country.color,
                troopsNumber: country.troopsNumber
            })
        });

        io.to(roomId).emit('get-current-map', game);
    })
    

    socket.on('pass-turn', () => {
        players = Object.keys(game.state.players);

        if(players[_turn] == socket.id) {
            current_socket = socket;
            resetTimeOut();
            next_turn();
        }
    })

    socket.on('attack-client-to-server', (attacker, defender) => {
        let attackObj = game.state.countries[attacker];
        let defenseObj = game.state.countries[defender];
        
        console.log("server_Attack obj: ", attackObj);
        console.log("server_defense obj: ", defenseObj);

        io.to(roomId).emit('attack-server-to-clients', attackObj, defenseObj);
    })

    socket.on('battle-to-server', (attack, defense) => {
        game.battle(attack, defense);

        io.to(roomId).emit('update-troops', (game));
    })

    socket.on('disconnect', (reason) => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            socket.connect();
        }

        io.to("room1").emit('serverToClient', socket.id);
          // else the socket will automatically try to reconnect
    })

});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});


//Battle settings
function battle(attackList, defenseList) {
    var attackLostedTroops = 0;
    var defenseLostedTroops = 0;

    let attackListSortByDesc = attackList.sort(function(a, b){return b-a});
    let defenseListSortByDesc = defenseList.sort(function(a, b){return b-a});

    for(let i=0; i < defenseListSortByDesc.length; i++){

        //Defense victory
        if(defenseListSortByDesc[i] >= attackListSortByDesc[i]){
            attackLostedTroops += 1;
        } 
        
        //Attack victory
        else {
            defenseLostedTroops += 1;
        }
    }

    return {
        attackLostedTroops,
        defenseLostedTroops
    };

}

function diceResults(troopsQuantity) {
    let playerDiceList = [];

    if(troopsQuantity >= 3) {
        for(let x=0; x < 3; x++){
            playerDiceList.push(Math.floor(Math.random() * 6 + 1));
        }
    }
    
    else {
        for(let x=0; x < troopsQuantity; x++){
            playerDiceList.push(Math.floor(Math.random() * 6 + 1));
        }
    }

    return playerDiceList;
}


//Players next turn
function next_turn(){
    var current_player = players[_turn];
    _turn = current_turn++ % players.length;
    console.log("Next turn: ", current_player);
    console.log("Current turn: ", current_socket.id);

    io.to(current_player).emit('start-turns', game, current_player);
    current_socket.broadcast.emit('not-your-turn');
    triggerTimeout();
 }

function triggerTimeout(){
   timeOut = setTimeout(()=>{
     next_turn();
   }, MAX_WAITING);
}

function resetTimeOut(){
    if(typeof timeOut === 'object'){
      console.log("timeout reset");
      clearTimeout(timeOut);
    }
}