var socket = io();

let startchat = document.getElementById('startchat');

let receiveTypingId = null;
let typingId = null;

let btn = document.getElementById('btn');
let spanTyping = document.getElementById('typing');
spanTyping.style.display = 'none';
let inputMsg = document.getElementById('newmsg');
let username = document.getElementById('username');
let msgList = document.getElementById('msglist');

socket.emit('join_room', {
    roomid: startchat.getAttribute('data-roomid')
});

btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg: inputMsg.value,
        username: username.value,
        roomid: startchat.getAttribute('data-roomid')
    });
}

socket.on('msg_rcvd', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = `${data.username}: ${data.msg}`;
    msgList.appendChild(limsg);
});

socket.on('someone_typing', (data) => {
    spanTyping.style.display = 'block';
    clearTimeout(receiveTypingId);
    receiveTypingId = setTimeout(() => {
        spanTyping.style.display = 'none';
    }, 1000);
})

inputMsg.addEventListener('keypress', function (e) {
    
    socket.emit('typing', {
        roomid: startchat.getAttribute('data-roomid'),
    });
    clearTimeout(typingId);
    typingId = setTimeout(() => {
        spanTyping.style.display = 'none';
    }, 3000);
    
})