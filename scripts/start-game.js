import { changeColors } from './change-country-color.js';
//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');


//Global variables
//Three players default
var playersQuantity = 6;
var playersColors = ['blue', 'green', 'yellow', 'gray', 'purple', 'red'];
var countriesImgList = [];
var contriesColorList = [];
var i = 0;

var roomExists;


//All of countries classes
var allOfWorldCountriesImages = document.getElementsByClassName('countries-images');


$(document).ready(function() {
    //Hover settings
    $(".countries-images").hover(function(){ $(this).toggleClass('shadow'); });
});

socket.emit('create', 'room1');

socket.on('createMap', roomExists => {
    roomExists = roomExists;
    //Distribute players on the board
    for (let countryImgElement of allOfWorldCountriesImages) {
        
        if(!roomExists) {
            //Add random territories to start game
            let countryRandomStartColor = getRandomItem(playersColors);

            contriesColorList.push(countryRandomStartColor);

            console.log(`NOT ->\nCountry: ${countryImgElement}
                        Color: ${countryRandomStartColor}`);
        
            changeColors(countryImgElement, countryRandomStartColor);

        }
    }
    

    socket.emit('mapElements', { 
        colors: contriesColorList
    });
});

socket.on('updateMap', data => {
    for (let countryImgElement of allOfWorldCountriesImages) {

        if(data.colors === undefined) {
            alert("Map already updated");
            return;
        }
        
        else {
            changeColors(countryImgElement, data.colors[i]);
            console.log(i);
            console.log(`EXISTS ->\nCountry: ${countryImgElement}
                        Color: ${data.colors[i]}`);
            i++;
        }
    }

    i=0;
});


// program to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

