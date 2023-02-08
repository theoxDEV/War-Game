//Global variables

var southAmericaDiv = document.getElementById('southAmerica'); 
var countryHasBeenClicked = false;
var countriesBattle = [];


//Attack and move defender army:
//attacker country has to have a border with defender country
$(".countries-images").click(function(e) {
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
    //if(attackerTroopsSpanId == 1) { return "You cannot attack"};
    //Cannot attack same color
    //Attacker
    let attackerCountryName = attacker.id;
    let attackerTroopsSpanId = document.getElementById(attackerCountryName + '-troop-number');
    let attackerDiv = document.getElementById(`${attackerCountryName}`);
    let attackerImage = attackerDiv.getElementsByTagName('img');

    //Defense
    let defenseCountryName = defender.id;
    let defenseTroopsSpanId = document.getElementById(defenseCountryName + '-troop-number');
    let defenseDiv = document.getElementById(`${defenseCountryName}`);
    let defenseImage = defenseDiv.getElementsByTagName('img');

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
    if(defenseTroopsSpanId.innerHTML == 0) {
        let change = changeCountryColor(attackerImage[0], defenseImage[0]);
        console.log(change);
    }

    //Setting timeout 'cause before of this implementation, class "animated shake" was removed
    //before the animation occurs
    setTimeout(function() {
        $("#" + attackerTroopsSpanId.id).removeClass("animated shake");
        //$("#" + attackerTroopsSpanId.id).innerHtml = battleResult.attackLostedTroops;
        
        $("#" + defenseTroopsSpanId.id).removeClass("animated shake");
        //attackerTroopsSpanId.innerHtml = battleResult.defenseLostedTroops;
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