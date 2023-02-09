import { attack } from './attack.js';

var southAmericaDiv = document.getElementById('southAmerica'); 
var countryHasBeenClicked = false;
var countriesBattle = [];


//Attack and move defender army:
//attacker country has to have a border with defender country
$(".countries-images").click(function(e) {
    
    //this.style['stroke-width'] = '7px';
    countriesBattle.push(this);
    
    if(countryHasBeenClicked) {
        countriesBattle.push(this);
        attack(countriesBattle[0], this);
        
        //Remove all of countries of countriesBattle
        while(countriesBattle.length){
            countriesBattle.pop();
        }

        //Finish attack deselecting the attack country
        //And turn countryHasBeenClicked to false
        countryHasBeenClicked = false;
    }
    
    else {
        countryHasBeenClicked = true;
    }
});

