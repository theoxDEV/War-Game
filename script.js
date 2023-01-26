//Global variables

var brazilTroop = document.getElementById('brazil-troop-number');
var argentinaTroop = document.getElementById('argentina-troop-number');



function attack(attacker, defender) {
    // Substitute to parameter after
    let attackerDiceList = diceResults(brazilTroop.textContent);
    let defenderDiceList = diceResults(argentinaTroop.textContent);

    battle(attackerDiceList, defenderDiceList);

    console.log(battle(attackerDiceList, defenderDiceList));
}

function battle(attackList, defenseList) {
    var attackResult;
    var defenseResult;

    let attackListSortByDesc = attackList.sort(function(a, b){return b-a});
    let defenseListSortByDesc = defenseList.sort(function(a, b){return b-a});

    console.log(defenseListSortByDesc);


    for(let i=0; i < attackListSortByDesc.length; i++){
        
        //Defense victory
        if(defenseListSortByDesc[i] >= attackListSortByDesc[i]){
            attackResult += 1;
        } 
        
        //Attack victory
        else {
            defenseResult += 1;
        }
    }

    return {
        attack: attackResult,
        defense: defenseResult
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