import createGame from "../game.js";
//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

const form = document.getElementById('userForm');
const userNickname = document.getElementById('userName');
const userRoom = document.getElementById('room');
const gameAreaDiv = document.getElementById('gameArea');

const game = createGame();
var playerId;

//Video
socket.on('connect', () => {
    //displayMessage(`You connected with id: ${socket.id}`)
    console.log(`You connected with id: ${socket.id}`);
    playerId = socket.id;
})


form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    var playerNickname = document.getElementById('userName').value;
    var playerRoomName = document.getElementById('room').value;
    
    socket.emit('new-player', playerNickname, playerRoomName);
}