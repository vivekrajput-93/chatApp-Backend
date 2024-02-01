const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { PORT } = require("./config/ServerConfig");

const app = express();
const server = http.createServer(app);
const  io = socketio(server);

io.on('connection', (socket) => {
    console.log("A user is connected!");

    socket.on('msg_send', (data) => {
        console.log(data);
        io.emit('msg_revcd', data)
    })

})

app.use('/', express.static(__dirname + "/client"))

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})