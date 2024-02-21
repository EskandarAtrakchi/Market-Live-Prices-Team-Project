//Socket.IO server on port 8000 with CORS allowing all origins
// socket.io is a library that enables real-time
// cors allows all origins to connect to the server
const io = require('socket.io')(8000, { cors: { origin: "*" } });

// console the port number address 
console.log('Running on port :' + io.httpServer.address().port);

//creating array of users 
const users = {};
// initiating the variable online users 
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