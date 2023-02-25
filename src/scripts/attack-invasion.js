//import { changeColors } from './change-country-color.js';

function attackInvasion(attackerImage, attackerTroops, defenseImage, defenseTroops) {
    console.log(`Defense troops: ${defenseTroops.innerHTML}`);
    let attackerColor = attackerImage.classList[1];
    
    changeColors(defenseImage, attackerColor);
    
    //TransferTroopsAnimation()
    attackerTroops.innerHTML = attackerTroops.innerHTML - 1;
    defenseTroops.innerHTML = 1;
    
    console.log(`Defense troops: ${defenseTroops.innerHTML}`);
}

export { attackInvasion };
