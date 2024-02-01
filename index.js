const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { PORT } = require("./config/ServerConfig");

const app = express();
const server = http.createServer(app);
const  io = socketio(server);

io.on('connection', (socket) => {
    console.log("A user is connected!");

    socket.on('from_client', () => {
        console.log("New event from client")
    })

    setInterval(() => {
        socket.emit('from_server')
    }, 2000)
})

app.use('/', express.static(__dirname + "/client"))

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})