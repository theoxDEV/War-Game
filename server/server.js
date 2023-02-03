import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

//Adding CORS - https://socket.io/docs/v4/handling-cors/#cors-header-access-control-allow-origin-missing
const io = new Server(httpServer, { 
    cors: {
        origin: "http://127.0.0.1:5500"
    }
 });

io.on("connection", (socket) => {
    socket.emit('init', { data: 'hello world' });
});

httpServer.listen(3000);