import createGame from '../game.js';
//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

const form = document.getElementById('userForm');
const userNickname = document.getElementById('userName');
const userRoom = document.getElementById('room');
const gameAreaDiv = document.getElementById('gameArea');

const readyBtn = document.getElementById('ready-btn');
const startBtn = document.querySelector('button[type=submit]');

//const game = createGame();
const playersLobby = {};
var playerId;

const game = createGame();

//Video
socket.on('connect', () => {
    //displayMessage(`You connected with id: ${socket.id}`)
    console.log(`You connected with id: ${socket.id}`);
    playerId = socket.id;
})

//Setup lobby
socket.on('setup', (game, roomExists) => {
    let playersInLobbyList = game.state.players;

    if(roomExists) { 
        startBtn.style.display = 'none';
        readyBtn.innerText = "Wait for ADMIN start game";
    }
    
    $('#players-in-room').empty();
    for (const playerId in playersInLobbyList) {
        const player = playersInLobbyList[playerId];
        $('#players-in-room').append(`<label id=${player.name}>Player Name: ${player.name} - Color: ${player.color}<label><br>`);
    }
})

form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    
    socket.emit('create-game', playerNickname, playerRoomName);
}

function roomLobby(){
    var playerNickname = document.getElementById('userName').value;
    var playerRoomName = document.getElementById('room').value;

    socket.emit('new-player', playerNickname, playerRoomName);
}

readyBtn.addEventListener("click", roomLobby);