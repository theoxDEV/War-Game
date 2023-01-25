//Global variables

var brazilTroop = document.querySelector('.brazil-troop span');
var argentinaTroop = document.querySelector('.argentina-troop span');

function attack(attacker, defender) {
    var attackerDiceList = diceResults(brazilTroop);
    var deffenderDiceList = diceResults(argentinaTroop);

    if(attackerDiceList.max() > deffenderDiceList.max()) {
        argentinaTroop.style.color = "red";
    }

}

function diceResults(troopsQuantity) {
    var playerDiceList = [];

    if(troopsQuantity >= 3) {
        for(var x=0; x < 3; x++){
            playerDiceList.push(Math.floor(Math.random() * 6 + 1));
        }
    } 
    
    else if(troopsQuantity == 2){
        for(var x=0; x < 2; x++){
            playerDiceList.push(Math.floor(Math.random() * 6 + 1));
        }
    }

    return playerDiceList;
}