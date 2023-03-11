import { hasBorders } from './borders.js';
import { attackInvasion } from './attack-invasion.js';
import { socket } from '../client/client.js';

var attackerTroopsTxtElement;
var attackerImage;
var defenseTroopsTxtElement;
var defenseImage;

socket.on('attack-server-to-clients', (attackerObj, defenderObj) => {
    attack(attackerObj, defenderObj);
})

socket.on('update-troops', (battleResult) => {

    //Attack cannot lost all of the troops
    if((attackerTroopsTxtElement.innerHTML - battleResult.attackLostedTroops) == 0){
        attackerTroopsTxtElement.innerHTML = 1;
    }
    
    else {
        $("#" + attackerTroopsTxtElement.id).addClass("animated shake");
        attackerTroopsTxtElement.innerHTML -= battleResult.attackLostedTroops;
    }
    
    
    $("#" + defenseTroopsTxtElement.id).addClass("animated shake");
    defenseTroopsTxtElement.innerHTML -= battleResult.defenseLostedTroops;

    //If defense lost all of troops
    //attackerImage.classList[1] = attacker color to fill defense color
    if(defenseTroopsTxtElement.innerHTML == 0) {
        attackInvasion(attackerImage, attackerTroopsTxtElement, defenseImage, defenseTroopsTxtElement);
    }

    //Setting timeout 'cause before of this implementation, class "animated shake" was removed
    //before the animation occurs
    setTimeout(function() {
        $("#" + attackerTroopsTxtElement.id).removeClass("animated shake");
        
        $("#" + defenseTroopsTxtElement.id).removeClass("animated shake");
    }, 1200);
})


function attack(attacker, defender) {

    //Attacker elements
    attackerImage = document.getElementById(`${attacker.name}`);
    attackerTroopsTxtElement = document.getElementById(attacker.name + '-troop-number');

    //Defense elements
    defenseImage = document.getElementById(`${defender.name}`);
    defenseTroopsTxtElement = document.getElementById(defender.name + '-troop-number');

    var hasBorder = hasBorders(attacker.name, defender.name);

    if(!hasBorder) {
        alert(`${attacker.name} cannot attack ${defender.name}`);
        return ; 
    }

    else if(attacker.color == defender.color) {
        alert("You cannot attack the same color");
        return ;
    }
    
    else if(attacker.troopsNumber == 1) {
        alert("You cannot attack with 1 troop");
        return ;
    }
    
    socket.emit('battle-to-server', attacker.troopsNumber, defender.troopsNumber);

}

export { attack };