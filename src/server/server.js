import { createServer } from "node:http";
import { Server } from "socket.io";
import express from 'express';

const app = express();
const httpServer = createServer(app);

const countriesObj = {};
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
            io.emit('create-map', mapCreated, countriesObj);
            mapCreated = true;
        }
        
        else {
            var countriesColorOrder = Object.keys(countriesObj).map(function(key){
                console.log(countriesObj[key]);
                return countriesObj[key].color;
            });

            io.emit('create-map', mapCreated, countriesColorOrder);
        }
    });

    socket.on('change-country-color', dict => {
        //Saved in dictionary variable to emit 'map-update' to all clients
        /*countriesObj[dict.country] = dict.color;
        io.emit('update-map', dict.country, dict.color, dict.troopsNumber);*/
        
        countriesObj[dict.country] = {
            name: dict.country,
            color: dict.color,
            troopsNumber: dict.troopsNumber
        }

    });

    socket.on('attack-client-to-server', (attacker, defender) => {
        let attackObj = countriesObj[attacker];
        let defenseObj = countriesObj[defender];

        console.log("Dict server: ", attacker);
        console.log("Att and def server: ", attackObj + " ::: ", defenseObj);
        io.emit('attack-server-to-clients', attackObj, defenseObj);
    })

    socket.on('battle-to-server', (attackTroops, defenseTroops) => {
        //Call Dice function
        let attackerDiceList = diceResults(attackTroops);
        let defenderDiceList = diceResults(defenseTroops);

        var battleResult = battle(attackerDiceList, defenderDiceList);

        io.emit('update-troops', battleResult);
    })

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