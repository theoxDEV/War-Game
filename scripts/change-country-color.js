function changeColors(countryImgElement, countryNewColor) {
    //Change country image filter to new color
    //Can be use after attack success
    //Add color to img class
    let classList = countryImgElement.classList;

    console.log("Class list: " + classList);

    if(classList.length >= 2 && countryNewColor != undefined) {
        console.log(countryNewColor);
        //Verify if it's is an attack source
        classList.replace(classList[1], countryNewColor);
    }
    
    else {
        classList.add(`${countryNewColor}`);
    }
};

export {changeColors};