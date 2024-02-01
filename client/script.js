var socket = io();

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msglist = document.getElementById('msgList');

btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg : inputMsg.value
    });

}


socket.on('msg_revcd', (data) => {
    let listMsg = document.createElement('li');
    listMsg.innerText = data.msg;
    msglist.appendChild(listMsg);
})