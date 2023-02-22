export default function createGame() {
    const state = {
        players: {}
    }

    function getRandomColorAndGoal() {
        
        const color = [
            "Red", "Blue", "Yellow", "Gray", "Green", "Purple"
        ];

        const goal = [
            "Matar ciano", "Mata cinza", "Matar red"
        ];

        const randomColor = Math.floor(Math.random() * color.length);
        const randomGoal = Math.floor(Math.random() * goal.length);

        return {
            "color": color[randomColor],
            "goal": goal[randomGoal]
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

        console.log("Player game.js:", state.players[player.playerId])
    }

    return {
        addPlayer,
        state
    }
}