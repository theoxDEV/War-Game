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
var playersQuantity = 3;
var playersColors = ['orange', 'red', 'green'];

//Continents
var southAmericaCountriesImgs = document.getElementById('southAmerica').getElementsByTagName('img');


//Distribute players on the board
for (let countryImgElement of southAmericaCountriesImgs) {
    let countryName = countryImgElement.alt;
    let countryRandomStartColor = getRandomItem(playersColors);

    countryImgElement.src = `images/countries/${countryName}-${countryRandomStartColor}.png`;
    //Add color to img class
    countryImgElement.classList.add(`${countryRandomStartColor}`);
}

// program to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

