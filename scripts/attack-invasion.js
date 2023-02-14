import { changeColors } from './change-country-color.js';

//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');


function attackInvasion(attackerImage, attackerTroops, defenseImage, defenseTroops) {
    let attackerColor = attackerImage.classList[1];
    
    changeColors(defenseImage, attackerColor);
    
    //TransferTroopsAnimation()
    attackerTroops.innerHTML -= 3;
    defenseTroops.innerHTML = 3;

    //Socket client
    socket.emit('attack')
}

export { attackInvasion };
