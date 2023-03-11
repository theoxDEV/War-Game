import { attack } from './attack.js';
import { socket } from '../client/client.js';
import { putPiecesOnBoard } from '../scripts/turn-based.js';

//Establishing a connection with the server on port 5500y
//const socket = io('http://localhost:3000');

var countryHasBeenClicked = false;
var countriesBattle = [];
var countryName;

//Turns
var turn = 1;
/*  1 - Move new pieces on board 
    2 - Attack opponents
    2_1 - Move attack pieces in attacked countries
    3 - Move pieces it already exists
*/


$(".countries-images").click(function(e) {
    switch (turn) {
        case 1:
            movePiecesScript(this);
            break;
        case 2:
            attackScript(this);
            break;
        default:
            console.log(`Sorry, we are out of ${turn}.`);
    }
});


function movePiecesScript(that) {
    countryName = that.id;

    var piecesOnBoardTurnEnded = putPiecesOnBoard(countryName);

    if(piecesOnBoardTurnEnded) {
        //Changed to attack turn
        turn = 2;
    }
}


function attackScript(that) {
    //this.style['stroke-width'] = '7px'; (focus on clicked country)
    //First country has been clicked (Attack)
    countriesBattle.push(that);
    
    if(countryHasBeenClicked) {
        //Second country has been clicked
        countriesBattle.push(that);

        let attack = countriesBattle[0].id;
        let defense = countriesBattle[1].id;
        
        //Remove all of countries of countriesBattle
        while(countriesBattle.length){
            countriesBattle.pop();
        }

        //Finish attack deselecting the attack country
        //And turn countryHasBeenClicked to false
        countryHasBeenClicked = false;

        socket.emit('attack-client-to-server', attack, defense);
    }
    
    else {
        countryHasBeenClicked = true;
    }
}

