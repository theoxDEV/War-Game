const socket = io('http://localhost:3000');

function changeColors(countryImgElement, countryNewColor) {
    //Change country image filter to new color
    //Can be use after attack success
    //Add color to img class
    changeColorServerSide(countryImgElement, countryNewColor);
    let classList = countryImgElement.classList;
    

    if(classList.length >= 2 && countryNewColor != undefined) {
        //Verify if it's is an attack source
        classList.replace(classList[1], countryNewColor);
    }
    
    else {
        classList.add(`${countryNewColor}`);
    }
};

function changeColorServerSide(countryImgElement, countryNewColor) {
    //Dictionary to change in server side
    let countriesDict = {
        country: countryImgElement.id,
        color: countryNewColor,
        troopsNumber: getCountryTroops(countryImgElement.id)
    };

    socket.emit('change-country-color', countriesDict);
}

socket.on('update-map', function(country, color, troopsNumber) {
    let countryTroopsElement = document.getElementById(`${country}-troop-number`);
    let countryImgElement = document.getElementById(country);
    let classList = countryImgElement.classList;

    if(classList.length >= 2 && color != undefined) {
        //Verify if it's is an attack source
        classList.replace(classList[1], color);
    }
    
    else {
        classList.add(`${color}`);
    }

    //Changing troops of this country
    countryTroopsElement.innerHTML = troopsNumber;
})

function getCountryTroops(countryName) {
    let troopsNumberFromHtml = document.getElementById(`${countryName}-troop-number`).innerHTML;
    let troopsNumber = troopsNumberFromHtml.replace(/\D/g, "");
    console.log("Get troop numbers: " + troopsNumber + " Country: " + countryName);
    return troopsNumber;
}

export {changeColors};