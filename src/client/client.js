//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

const form = document.getElementById('userForm');
const userNickname = document.getElementById('userName');
const userRoom = document.getElementById('room');
const gameAreaDiv = document.getElementById('gameArea');

var players = {};

//Video
socket.on('connect', () => {
    //displayMessage(`You connected with id: ${socket.id}`)
    console.log(`You connected with id: ${socket.id}`);
})


form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    playerNickname = document.getElementById('userName').value;
    playerRoomName = document.getElementById('room').value;
    socket.emit('new-player', playerNickname, playerRoomName);
}