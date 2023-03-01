import { socket } from '../client/client.js';

let current_turn = 0;
let turn_list;
let _turn = 0;
let players = [];
let socketsList = [];

const MAX_WAITING = 10000;

socket.on('start-turns', (game) => {
    players = game.state.players;
    turn_list = Object.keys(players);

    let playerTurnId = turn_list[current_turn];

    if(playerTurnId == players[socket.id].id) {
        alert("your turn");
    } else {
        alert(`Wait for your turn\nThis is ${players[playerTurnId].name}`);
    }///
})

socket.on('pass-turn', (game) => {
    console.log("pass_turn: ", players);
    console.log("pass_turn2: ", socket.rooms);

    if(socketsList[_turn] == socket) {
        console.log("players_turn id: " + socketsList[_turn].id);
        alert("your turn");
        $(document).ready(function() {
            //Hover settings
            $(`.countries-images ${players[current_turn].color}`).hover(function(){ $(this).toggleClass('shadow'); });
        });
    }
})