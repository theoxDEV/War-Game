import { hasBorders } from './borders.js';
import { attackInvasion } from './attack-invasion.js';

//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

socket.on('attack-server-to-clients', (attackerObj, defenderObj) => {
    console.log("Att obj: ", attackerObj);
    attack(attackerObj, defenderObj);
})

var attackerTroopsSpanId;
var attackerImage;
var defenseTroopsSpanId;
var defenseImage;

function attack(attacker, defender) {

    //Attacker elements
    var attackerCountryName = attacker.name;
    var attackerTroopsQuantity = attacker.troopsNumber;
    attackerImage = document.getElementById(`${attackerCountryName}`);
    var attackerColor = attackerImage.classList[1];
    attackerTroopsSpanId = document.getElementById(attackerCountryName + '-troop-number');

    //Defense elements
    var defenseCountryName = defender.name;
    var defenseTroopsQuantity = defender.troopsNumber;
    defenseImage = document.getElementById(`${defenseCountryName}`);
    var defenseColor = defenseImage.classList[1];
    defenseTroopsSpanId = document.getElementById(defenseCountryName + '-troop-number');

    var hasBorder = hasBorders(attackerCountryName, defenseCountryName);

    if(!hasBorder) {
        alert(`${attackerCountryName} cannot attack ${defenseCountryName}`);
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
    
    socket.emit('battle-to-server', attackerTroopsQuantity, defenseTroopsQuantity);


    //emit battle
    //battleResult == serverResult
    //socket.on('server-battle-result', function(attLosted, defLosted) => {  })

}

socket.on('update-troops', (battleResult) => {
    
    console.log("att losted: " + battleResult.attackLostedTroops);
    //Attack cannot lost all of the troops
    if((attackerTroopsSpanId.innerHTML - battleResult.attackLostedTroops) == 0){
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
})

export { attack };