//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

export { socket };

const userNickname = document.getElementById('userName');
const userRoom = document.getElementById('room');

const readyBtn = document.getElementById('ready-btn');
const startBtn = document.getElementById('start-btn');

//const game = createGame();
const playersLobby = {};
var playerId;

//Video
socket.on('connect', () => {
    //displayMessage(`You connected with id: ${socket.id}`)
    console.log(`You connected with id: ${socket.id}`);
    playerId = socket.id;
})

//Setup lobby
socket.on('setup', (game, roomExists) => {
    let playersInLobbyList = game.state.players;
    let adminId = Object.values(playersInLobbyList)[0]['id'];

    if(roomExists && socket.id != adminId) { 
        startBtn.style.display = 'none';
        readyBtn.innerText = "Wait for ADMIN start game";
    }
    
    $('#players-in-room').empty();
    for (const playerId in playersInLobbyList) {
        const player = playersInLobbyList[playerId];
        $('#players-in-room').append(`<label id=${player.name}>Player Name: ${player.name} - Color: ${player.color}<label><br>`);
    }
})

function createGame() {

    var playerRoomName = document.getElementById('room').value;
    
    socket.emit('create-game', playerRoomName);
}


startBtn.addEventListener("click", createGame);


function roomLobby(){
    var playerNickname = document.getElementById('userName').value;
    var playerRoomName = document.getElementById('room').value;

    socket.emit('new-player', playerNickname, playerRoomName);
}

readyBtn.addEventListener("click", roomLobby);