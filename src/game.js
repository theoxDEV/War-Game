export default function createGame() {

    const state = {
        players: {},
        countries: {}
    }
        
    var color = [
        "Red", "Blue", "Yellow", "Gray", "Green", "Purple"
    ];

    var goal = [
        "Matar ciano", "Mata cinza", "Matar red"
    ];

    function getRandomColorAndGoal() {

        const randomColor = Math.floor(Math.random() * color.length);
        const randomGoal = Math.floor(Math.random() * goal.length);

        let selectedColor = color[randomColor];
        let selectedGoal = goal[randomGoal];

        //Remove element of list
        color.splice(color.indexOf(selectedColor), 1);
        goal.splice(goal.indexOf(selectedGoal), 1);

        return {
            "color": selectedColor,
            "goal": selectedGoal
        }
    }

    function addPlayer(player) {

        let randomElements = getRandomColorAndGoal();

        state.players[player.playerId] = {
            id: player.playerId,
            name: player.playerNickname,
            room: player.playerRoomName,
            color: randomElements.color,
            goal: randomElements.goal
        };
    }

    function setCountry(country) {
        state.countries[country.name] = {
            name: country.name,
            color: country.color,
            troopsNumber: country.troopsNumber
        }
    }

    function addCountryTroops(countryName, troopsQuantity = 1) {
        state.countries[countryName] = {
            troopsNumber: troopsNumber + troopsQuantity
        }
    }


    /* BATTLE FUNCTIONS  */
    function battle(attack, defense) {
        //Call Dice function
        let attackerDiceList = dices_results(attack.troopsNumber);
        let defenderDiceList = dices_results(defense.troopsNumber);

        var battleResult = battle_results(attackerDiceList, defenderDiceList);

        subtractCountryTroops(attack, battleResult.attackLostedTroops);
        subtractCountryTroops(defense, battleResult.defenseLostedTroops);
    }
    
    function battle_results(attackList, defenseList) {
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

    function dices_results(troopsQuantity) {
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

    function subtractCountryTroops(country, lostedTroopsQuantity) {
        var battle_troops_results = 
            function(country) {
                if(country.troopsNumber - lostedTroopsQuantity == 0) {
                    return 1;
                } else { 
                    return country.troopsNumber - lostedTroopsQuantity;
                }
        };

        state.countries[country.name] = {
            troopsNumber: battle_troops_results(country)
        }
    }


    return {
        addPlayer,
        state,
        setCountry,
        battle
    }
}