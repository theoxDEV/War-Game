import { socket } from '../client/client.js';

let current_playerObj;
let current_player_color;

const MAX_WAITING = 10000;

socket.on('start-turns', (game, current_player) => {
    current_playerObj = game.state.players[current_player];
    var countries = Object.values(game.state.countries);

    boardPieces(countries, current_playerObj.color);

})


function boardPieces(countries, playerColor) {
    let countriesCount = 0;
    let pieceToPutIntoBoard = 0;

    for(let country of countries) {
        if(countries[country].color == playerColor) {
            countriesCount++;
        }
    }

    //War rule
    pieceToPutIntoBoard = Math.floor(countriesCount / 2);

    return pieceToPutIntoBoard;
}



//if click pass_turn button emit pass-turn