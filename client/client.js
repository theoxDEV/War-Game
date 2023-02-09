//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

//Callback function fires on the event called 'serverToClient'
socket.on('serverToClient', (data) => {
    alert(data);
})

//Client sends a message at the moment it got connected with the server
socket.emit('clientToServer', "Hello, server!");