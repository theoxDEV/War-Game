import { socket } from '../client/client.js';
import { putPiecesOnBoard } from '../scripts/script.js';

let current_playerObj;
let current_player_color;
var countries;
var piecesQuantity;
var gameS;

const MAX_WAITING = 10000;

socket.on('start-turns', (game, current_player) => {
    current_playerObj = game.state.players[current_player];
    current_player_color = current_playerObj.color;
    countries = Object.values(game.state.countries);
    piecesQuantity = boardPieces(countries, current_player_color);

    console.log("Current player: ", current_playerObj);

    gameS = putPiecesOnBoard(piecesQuantity, game, current_player_color);

    console.log("Turn based: ", gameS);
})


function boardPieces(countries, playerColor) {
    let countriesCount = 0;
    let pieceToPutIntoBoard = 0;

    for(let country of countries) {
        if(country.color == playerColor) {
            countriesCount++;
        }
    }

    //Game rule
    if(countriesCount <= 7) {
        pieceToPutIntoBoard = 3;
    }
    else {
        pieceToPutIntoBoard = Math.floor(countriesCount / 2);
    }

    return pieceToPutIntoBoard;
}