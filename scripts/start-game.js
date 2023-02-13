import { changeColors } from './change-country-color.js';
//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');


//Global variables
//Three players default
var playersQuantity = 6;
var playersColors = ['blue', 'green', 'yellow', 'gray', 'purple', 'red'];


$(document).ready(function() {
    //Hover settings
    $(".countries-images").hover(function(){ $(this).toggleClass('shadow'); });
});

socket.emit('create', 'room1');

socket.on('createMap', () => {

    //Continents
    //var southAmericaCountriesImgs = document.getElementById('south-america').getElementsByClassName('countries-images');
    var allOfWorldCountriesImages = document.getElementsByClassName('countries-images');
    
    //Distribute players on the board
    for (let countryImgElement of allOfWorldCountriesImages) {
    
        //Add random territories to start game
        let countryRandomStartColor = getRandomItem(playersColors);
    
        changeColors(countryImgElement, countryRandomStartColor);
    }

})


// program to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

