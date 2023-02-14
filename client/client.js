//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

const form = document.getElementById('userForm');
const gameAreaDiv = document.getElementById('gameArea');

const color = [
    "Red", "Blue", "Yellow", "Gray", "Green", "Purple"
];

const goal = [
    "Matar ciano", "Mata cinza", "Matar red"
];

const randomColor = Math.floor(Math.random() * color.length);
const randomGoal = Math.floor(Math.random() * goal.length);

//Client sends a message at the moment it got connected with the server
socket.emit('newPlayer', {
    color: color[randomColor], 
    goal: goal[randomGoal]
});

//Client sends a message at the moment it got connected with the server
socket.emit('clientToServer', "Hello, server!");

form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    clientBalls[selfID].name = document.getElementById('userName').value;
    socket.emit('clientName', clientBalls[selfID].name);
    return false;
}