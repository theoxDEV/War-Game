//Global variables

var brazilTroop = document.getElementById('brazil-troop-number');
var argentinaTroop = document.getElementById('argentina-troop-number');
var boliviaTroop = document.getElementById('bolivia-troop-number');
var countryHasBeenClicked = false;
var countriesBattle = [];


//Attack and move defender army:
//attacker country has to have a border with defender country
$(".countries").click(function(e) {
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



function attack(attacker, defender) {
    //Substitute to parameter after
    //brazilTroop attack
    //argentinaTroop defense
    //if(attackerTroops == 1) { return "You cannot attack"};
    //Attacker
    let attackerId = attacker.id;
    let attackerTroops = document.getElementById(attackerId + '-troop-number');

    //Defense
    let defenseId = defender.id;
    let defenseTroops = document.getElementById(defenseId + '-troop-number');


    let attackerDiceList = diceResults(attackerTroops.textContent);
    let defenderDiceList = diceResults(defenseTroops.textContent);

    var battleResult = battle(attackerDiceList, defenderDiceList);

    //Attack cannot lost all of the troops
    if(attackerTroops.textContent - battleResult.attackLostedTroops == 0){
        attackerTroops.textContent = 1;
    }else {
        attackerTroops.textContent -= battleResult.attackLostedTroops;
    }

    defenseTroops.textContent -= battleResult.defenseLostedTroops;
}


function battle(attackList, defenseList) {
    var attackLostedTroops = 0;
    var defenseLostedTroops = 0;

    let attackListSortByDesc = attackList.sort(function(a, b){return b-a});
    let defenseListSortByDesc = defenseList.sort(function(a, b){return b-a});

    for(let i=0; i < defenseListSortByDesc.length; i++){

        //Defense victory
        if(defenseListSortByDesc[i] >= attackListSortByDesc[i]){
            attackLostedTroops += 1;
        } 
        
        //Attack victory
        else {
            defenseLostedTroops += 1;
        }
    }

    return {
        attackLostedTroops,
        defenseLostedTroops
    };

}


function diceResults(troopsQuantity) {
    let playerDiceList = [];

    if(troopsQuantity >= 3) {
        for(let x=0; x < 3; x++){
            playerDiceList.push(Math.floor(Math.random() * 6 + 1));
        }
    }
    
    else {
        for(let x=0; x < troopsQuantity; x++){
            playerDiceList.push(Math.floor(Math.random() * 6 + 1));
        }
    }

    return playerDiceList;
}