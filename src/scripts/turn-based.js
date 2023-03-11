import { socket } from '../client/client.js';
import createGame from "../game.js";

const game_const = createGame();


const gameAreaDiv = document.getElementById('gameArea');

let current_playerObj;
let current_player_color;
let countryTroopsNumber = 1;
var countries;
var piecesQuantity;

var _game;
var _playerColor;
const MAX_WAITING = 10000;

socket.on('not-your-turn', () => {
    gameAreaDiv.classList.add("no-click");
})

socket.on('start-turns', (game, current_player) => {

    /* Remove no-click class of emitted 'not-your-turn'*/
    if(gameAreaDiv.classList.contains("no-click")) {
        gameAreaDiv.classList.remove("no-click")
    }

    _game = game;
    current_playerObj = game.state.players[current_player];
    current_player_color = current_playerObj.color;
    countries = Object.values(game.state.countries);
    piecesQuantity = boardPieces(countries, current_player_color);

    console.log("Current player: ", current_playerObj.color, socket.id);
})


function boardPieces(countries, playerColor) {
    _playerColor = playerColor;
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

function putPiecesOnBoard(countryName) {

    if(typeof countryName == 'undefined') {
        /* GET troops from 'server' game state */
        countryTroopsNumber = _game.state.countries[countryName].troopsNumber;
        return false;
    }
    
    else if(piecesQuantity > 0) {
        if(_game.state.countries[countryName].color == _playerColor) {

            game_const.setCountry({
                name: countryName,
                color: _playerColor,
                troopsNumber: countryTroopsNumber + 1
            });

            /* UPDATING the country troops from 'client' state */
            countryTroopsNumber = game_const.state.countries[countryName].troopsNumber;

            renderizeClientMap(countryName);
            piecesQuantity--;
        }
        
        else {
            alert("You can only add troops in your countries");
            return false;
        }
    }
    
    else if(piecesQuantity == 0){
        socket.emit('set-game-state', game_const);
        return true;
    }
}

export { putPiecesOnBoard };


function renderizeClientMap(countryName) {
    let countryText = document.getElementById(countryName + '-troop-number');

    countryText.innerHTML++;
}