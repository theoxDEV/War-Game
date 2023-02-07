//Socket io client side
const socket = io('http://localhost:3000');

socket.on('init', handleInit);

function handleInit(mgs){
    console.log(mgs);
}

//Global variables
//Three players default
var playersQuantity = 6;
var playersColors = ['blue', 'green', 'yellow', 'gray', 'purple', 'red'];


$(document).ready(function() {
    //Hover settings
    $(".countries-images").hover(function(){ $(this).toggleClass('cn'); });
});

function changeColors(playerColor, countryImageElement, countryName) {
    //Change country image filter to new color
    //Can be use after attack success
    countryImageElement.style.filter = `var(--${playerColor})`;
}

//Continents
var southAmericaCountriesImgs = document.getElementById('south-america').getElementsByTagName('img');

//Distribute players on the board
for (let countryImgElement of southAmericaCountriesImgs) {

    //Add random territories to start game
    let countryRandomStartColor = getRandomItem(playersColors);
    //Add color to img class
    countryImgElement.classList.add(`${countryRandomStartColor}`);

    changeColors(countryRandomStartColor, countryImgElement);
}

// program to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

