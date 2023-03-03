import { socket } from '../client/client.js';

let current_playerObj;
let current_player_color;

const MAX_WAITING = 10000;

socket.on('start-turns', (game, current_player) => {
    current_playerObj = game.state.players[current_player];
    var current_player_color = current_playerObj.color;
    var countries = Object.values(game.state.countries);

    var piecesQuantity = boardPieces(countries, current_player_color);

    putPiecesOnBoard(piecesQuantity, game, current_player_color);
})


function boardPieces(countries, playerColor) {
    let countriesCount = 0;
    let pieceToPutIntoBoard = 0;

    for(let country of countries) {
        if(country.color == playerColor) {
            countriesCount++;
        }
    }

    //War rule
    if(countriesCount <= 7) {
        pieceToPutIntoBoard = 3;
    }
    else {
        pieceToPutIntoBoard = Math.floor(countriesCount / 2);
    }

    return pieceToPutIntoBoard;
}

function putPiecesOnBoard() {

}



//if click pass_turn button emit pass-turn