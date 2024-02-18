const express = require('express');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'tested! working.' });
});

app.get('/ticker', async (req, res) => {
    try {
        const response = await axios.get('https://api.alternative.me/v1/ticker/');
        const responseData = response.data;

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
});

app.get('/listings', async (req, res) => {
    try {
        const response = await axios.get('https://api.alternative.me/v2/listings/');
        const responseData = response.data;

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
});

app.get('/documentation', async (req, res) => {
    try {
        const response = await axios.get('https://api.alternative.me/v2/listings/');
        const responseData = response.data;

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
});

const users = {};
let onlineUsers = 0;

io.on('connection', socket => {
    onlineUsers = onlineUsers + 1;
    socket.emit('userIncrement', onlineUsers);

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

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers - 1;
        socket.broadcast.emit('disconnected', { name: users[socket.id], onUsers: onlineUsers })
        delete users[socket.id]
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
