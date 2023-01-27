//Global variables

var brazilTroop = document.getElementById('brazil-troop-number');
var argentinaTroop = document.getElementById('argentina-troop-number');
var boliviaTroop = document.getElementById('bolivia-troop-number');

function attack(attacker, defender) {
    //Substitute to parameter after
    //brazilTroop attack
    //argentinaTroop defense
    //if(attacker == 1) { return {"You cannot attack"}};
    let attackerDiceList = diceResults(brazilTroop.textContent);
    let defenderDiceList = diceResults(argentinaTroop.textContent);

    var battleResult = battle(attackerDiceList, defenderDiceList);

    console.log(battleResult);

    //Attack cannot lost all of the troops
    if(brazilTroop.textContent - battleResult.attackLostedTroops == 0){
        brazilTroop.textContent = 1;
    }

    argentinaTroop.textContent -= battleResult.defenseLostedTroops;
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