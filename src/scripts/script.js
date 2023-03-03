import { attack } from './attack.js';
import { socket } from '../client/client.js';
import createGame from "../game.js";

//Establishing a connection with the server on port 5500y
//const socket = io('http://localhost:3000');

var gameScript = createGame();
var countryHasBeenClicked = false;
var countriesBattle = [];

function putPiecesOnBoard(piecesQuantity, game, playerColor) {
    $(".countries-images").click(function(e) {
        var countryName = this.id;

        if(game.state.countries[countryName].color == playerColor) {
            gameScript.moveTroopsInCountry({
                name: countryName, 
                troopsNumber: piecesQuantity
            });
            
            return game;
        }
        
        else {
            alert("You can only add troops in your countries");
            return;
        }

    });
}

export { putPiecesOnBoard };



function attackScript() {
    //Attack and move defender army:
    //attacker country has to have a border with defender country
    $(".countries-images").click(function(e) {
        //this.style['stroke-width'] = '7px'; (focus on clicked country)
        //First country has been clicked (Attack)
        countriesBattle.push(this);
        
        if(countryHasBeenClicked) {
            //Second country has been clicked
            countriesBattle.push(this);

            let attack = countriesBattle[0].id;
            let defend = countriesBattle[1].id;

            socket.emit('attack-client-to-server', attack, defend);
            console.log(`${countriesBattle[0].id} // ${countriesBattle[1].id}`);
            //attack(countriesBattle[0], this);
            
            //Remove all of countries of countriesBattle
            while(countriesBattle.length){
                countriesBattle.pop();
            }

            //Finish attack deselecting the attack country
            //And turn countryHasBeenClicked to false
            countryHasBeenClicked = false;
        }
        
        else {
            countryHasBeenClicked = true;
        }
    });
}

