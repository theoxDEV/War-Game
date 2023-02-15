const socket = io('http://localhost:3000');

var _countryImgElement;
var _countryNewColor;

function changeColors(countryImgElement, countryNewColor) {
    changeColorServerSide(countryImgElement, countryNewColor);
    _countryImgElement = countryImgElement;
    _countryNewColor = countryNewColor;
    //Change country image filter to new color
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
};

function changeColorServerSide(countryImgElement, countryNewColor) {
    //Dictionary to change in server side
    let countriesDict = {
        country: countryImgElement.id,
        color: countryNewColor
    };

    socket.emit('change-country-color', countriesDict);
}

socket.on('update-map', (countryName, color) => {
    let countryImage = document.getElementById(_countryImgElement.id);
    console.log("update map color: " + _countryNewColor);
    changeColors(countryImage, _countryNewColor);
})

export {changeColors};