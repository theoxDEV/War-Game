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

    function moveTroopsInCountry(country) {
        state.countries[country.name] = {
            troopsNumber: country.troopsNumber
        }
    }

    function getPlayers() {
        return state.players;
    }

    return {
        addPlayer,
        state,
        getPlayers,
        setCountry,
        moveTroopsInCountry
    }
}