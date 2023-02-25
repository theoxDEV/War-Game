import { socket } from '../client/client.js';

let current_turn = 0;
let turn_list;
let players = [];

const MAX_WAITING = 10000;

socket.on('pass-turn', (game) => {
    players = game.state.players;
    console.log("pass_turn: ", players);
    console.log("pass_turn2: ", socket.rooms);

    if(players[current_turn] == socket) {

        $(document).ready(function() {
            //Hover settings
            $(`.countries-images ${players[current_turn].color}`).hover(function(){ $(this).toggleClass('shadow'); });
        });
    }
})