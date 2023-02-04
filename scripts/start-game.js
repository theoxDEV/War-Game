//Blue 
//Green
//Yellow
//Gray
//Purple
//Red

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
        
    $("#brazil img").hover(function(){ $(this).toggleClass('hover-class'); });
});

function changeColors(playerColor, countryName) {

    //GET ROOT CODE
    let root = document.querySelector(':root');
    
    //root.style.setProperty('--countrycolor', `var(--${playerColor})`);

    console.log(countryName);

    //filter: var(--countrycolor);
}

//Continents
var southAmericaCountriesImgs = document.getElementById('southAmerica').getElementsByTagName('img');

//Distribute players on the board
for (let countryImgElement of southAmericaCountriesImgs) {
    let countryName = countryImgElement.alt;

    let countryRandomStartColor = getRandomItem(playersColors);
    //Add color to img class
    countryImgElement.classList.add(`${countryRandomStartColor}`);

    changeColors(countryRandomStartColor, countryName);
}

// program to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

