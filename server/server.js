import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    socket.emit('init', { data: 'hello world' });
});

httpServer.listen(3000);