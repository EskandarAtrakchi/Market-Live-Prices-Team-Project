//Socket.IO server on port 8000 with CORS allowing all origins
const io = require('socket.io')(8000, { cors: { origin: "*" } });

console.log('Running on port :' + io.httpServer.address().port);

const users = {};
let onlineUsers = 0;

//tracks online users, emits an 'userIncrement' event on connection
io.on('connection', socket => {
    onlineUsers = onlineUsers + 1;
    socket.emit('userIncrement', onlineUsers);

    //handles new user joining ('new-user-joined' event), and broadcasts messages ('send' event)
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', { name: users[socket.id], onUsers: onlineUsers })
    })

    socket.on('send', data => {
        socket.broadcast.emit('receive', { message: data.message, name: users[socket.id], id: data.id })
    })

    socket.on('liked', id => {
        socket.broadcast.emit('msg-like', id)
    })

    //handles disconnections ('disconnect' event) 
    socket.on('disconnect', () => {
        //updating online user count and broadcasting 'disconnected' event.
        onlineUsers = onlineUsers - 1;
        socket.broadcast.emit('disconnected', { name: users[socket.id], onUsers: onlineUsers })
        delete users[socket.id]
    })
})
// Path: chatServer/index.js