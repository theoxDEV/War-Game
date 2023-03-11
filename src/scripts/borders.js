let borders = 
{
    //South America
    Brazil: ["Argentina", "Algeria", "Peru", "Venezuela"],
    Argentina: ["Brazil", "Peru"],
    Peru: ["Brazil", "Venezuela", "Argentina"],
    Venezuela: ["Brazil", "Peru", "Mexico"],
    //North America
    Mexico: ["Venezuela", "California", "NewYork"],
    California: ["Mexico", "NewYork", "Vancouver"],
    NewYork: ["Mexico", "California", "Ottawa", "Labrador"],
    Vancouver: ["California", "Ottawa", "Mackenzie", "Alaska"],
    Ottawa: ["NewYork", "California", "Vancouver", "Mackenzie", "Labrador"],
    Labrador: ["Ottawa", "NewYork", "Groenlandia"],
    Mackenzie: ["Alaska", "Vancouver", "Ottawa", "Groenlandia"],
    Alaska: ["Mackenzie", "Vancouver", "Vladvostok"],
    Groenlandia: ["Mackenzie", "Labrador", "Islandia"]
}

function hasBorders(firstCountry, secondCountry) {

    //List of all of countries that has a border with the first country
    let firstCountryBordersList = borders[`${firstCountry}`];
    
    const even = (element) => element == secondCountry;

    //Verify if second country has a border with firstCountry border list
    return firstCountryBordersList.some(even);

}

export {hasBorders};