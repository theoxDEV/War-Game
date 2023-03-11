import { hasBorders } from './borders.js';
import { socket } from '../client/client.js';

var attackerName;
var attackerTroopsTxtElement;
var attackerImage;

var defenseName;
var defenseTroopsTxtElement;
var defenseImage;

socket.on('attack-server-to-clients', (attackerObj, defenderObj) => {
    
    console.log("before_att_Attack obj: ", attackerObj);
    console.log("before_att_defense obj: ", defenderObj);
    
    attack(attackerObj, defenderObj);
})

socket.on('update-troops', (game) => {
    var attacker_server_state = game.state.countries[attackerName];
    var defense_server_state = game.state.countries[defenseName];

    //Attack cannot lost all of the troops
    attackerTroopsTxtElement.innerHTML = attacker_server_state.troopsNumber;
    $("#" + attackerTroopsTxtElement.id).addClass("animated shake");
    
    
    $("#" + defenseTroopsTxtElement.id).addClass("animated shake");
    defenseTroopsTxtElement.innerHTML = defense_server_state.troopsNumber;

    //Setting timeout 'cause before of this implementation, class "animated shake" was removed
    //before the animation occurs
    setTimeout(function() {
        $("#" + attackerTroopsTxtElement.id).removeClass("animated shake");
        
        $("#" + defenseTroopsTxtElement.id).removeClass("animated shake");
    }, 1200);
})


function attack(attacker, defender) {

    //Attacker elements
    attackerName = attacker.name;
    attackerImage = document.getElementById(`${attacker.name}`);
    attackerTroopsTxtElement = document.getElementById(attacker.name + '-troop-number');

    //Defense elements
    defenseName = defender.name;
    defenseImage = document.getElementById(`${defender.name}`);
    defenseTroopsTxtElement = document.getElementById(defender.name + '-troop-number');

    console.log("Attack countries: ", attackerName, "//", defenseName);

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
    
    socket.emit('battle-to-server', attacker, defender);

}

export { attack };