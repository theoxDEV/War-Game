import { changeColors } from './change-country-color.js';


function attackInvasion(attackerImage, attackerTroops, defenseImage, defenseTroops) {
    let attackerColor = attackerImage.classList[1];
    
    changeColors(defenseImage, attackerColor);
    
    //TransferTroopsAnimation()
    attackerTroops.innerHTML -= 3;
    defenseTroops.innerHTML = 3;
}

export { attackInvasion };
