import { socket } from '../client/client.js';
import createGame from "../game.js";

const game = createGame();
//Global variables
//Three players default
var playersQuantity = 6;
var playersColors = ['Blue', 'Green', 'Yellow', 'Gray', 'Purple', 'Red'];
var i = 0;

//All of countries classes
var allOfWorldCountriesImages = document.getElementsByClassName('countries-images');

const form = document.getElementById('userForm');
const gameAreaDiv = document.getElementById('gameArea');


// Admin create map
socket.on('create-map', () => {

    var countryNextColor;
    
    //Distribute players on the board
    for (let countryImgElement of allOfWorldCountriesImages) {
        let countryName = countryImgElement.id;

        countryNextColor = getRandomItem(playersColors);

        game.setCountry({
            name: countryName,
            color: countryNextColor,
            troopsNumber: 1
        });

        setInitialScreen();
        changeTroopNumber(countryName);
        changeColors(countryImgElement, countryNextColor);

        i++;
    }
    i = 0;
    socket.emit('set-game-state', game);
})

//Room gets map created by admin
socket.on('get-current-map', (gameFromServer) => {
    
    for(let countryImgElement of allOfWorldCountriesImages) {
        let countryName = countryImgElement.id;
        let countryNextColor = gameFromServer.state.countries[countryName].color;
        let countryTroopsNumber = gameFromServer.state.countries[countryName].troopsNumber;
        
        setInitialScreen();
        changeTroopNumber(countryName, countryTroopsNumber);
        changeColors(countryImgElement, countryNextColor);
        
        i++;
    }
    i = 0;

    socket.emit("pass-turn");
})


// program to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

export { getRandomItem };


// Change country image filter to new color
function changeColors(countryImgElement, countryNewColor) {
    //Can be use after attack success
    //Add color to img class
    let classList = countryImgElement.classList;
    

    if(classList.length >= 2 && countryNewColor != undefined) {
        //Verify if it's is an attack source
        classList.replace(classList[1], countryNewColor);
    }
    
    else {
        classList.add(`${countryNewColor}`);
    }
}

// Change all of country troop number to 0 at start game
function changeTroopNumber(countryName, countryTroopsNumber) {
    var countryTroop = document.getElementById(countryName + '-troop-number');
    countryTroop.innerHTML = countryTroopsNumber;
}

function setInitialScreen() {
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
}
