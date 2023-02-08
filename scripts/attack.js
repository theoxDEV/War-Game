import { hasBorders } from './borders.js';
import { changeColors } from './change-country-color.js';
import { attackInvasion } from './attack-invasion.js';



function attack(attacker, defender) {

    //Attacker elements
    let attackerCountryName = attacker.id;
    let attackerTroopsSpanId = document.getElementById(attackerCountryName + '-troop-number');
    let attackerImage = document.getElementById(`${attackerCountryName}`);
    let attackerColor = attackerImage.classList[1];

    //Defense elements
    let defenseCountryName = defender.id;
    let defenseTroopsSpanId = document.getElementById(defenseCountryName + '-troop-number');
    let defenseImage = document.getElementById(`${defenseCountryName}`);
    let defenseColor = defenseImage.classList[1];

    var hasBorder = hasBorders(attacker.id, defender.id);

    if(!hasBorder) {
        alert(`${attacker.id} cannot attack ${defender.id}`);
        return ;
    }

    else if(attackerColor == defenseColor) {
        alert("You cannot attack the same color");
        return ;
    }
    
    else if(attackerTroopsSpanId.innerHTML == 1) {
        alert("You cannot attack with 1 troop");
        return ;
    }

    //Call Dice function
    let attackerDiceList = diceResults(attackerTroopsSpanId.innerHTML);
    let defenderDiceList = diceResults(defenseTroopsSpanId.innerHTML);

    var battleResult = battle(attackerDiceList, defenderDiceList);

    //Attack cannot lost all of the troops
    if(attackerTroopsSpanId.innerHTML - battleResult.attackLostedTroops == 0){
        attackerTroopsSpanId.innerHTML = 1;
    }
    
    else {
        $("#" + attackerTroopsSpanId.id).addClass("animated shake");
        attackerTroopsSpanId.innerHTML -= battleResult.attackLostedTroops;
    }
    
    
    $("#" + defenseTroopsSpanId.id).addClass("animated shake");
    defenseTroopsSpanId.innerHTML -= battleResult.defenseLostedTroops;

    //If defense lost all of troops
    //attackerImage.classList[1] = attacker color to fill defense color
    if(defenseTroopsSpanId.innerHTML == 0) {
        attackInvasion(attackerImage, attackerTroopsSpanId, defenseImage, defenseTroopsSpanId);
    }

    //Setting timeout 'cause before of this implementation, class "animated shake" was removed
    //before the animation occurs
    setTimeout(function() {
        $("#" + attackerTroopsSpanId.id).removeClass("animated shake");
        
        $("#" + defenseTroopsSpanId.id).removeClass("animated shake");
    }, 1200);
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



export { attack };