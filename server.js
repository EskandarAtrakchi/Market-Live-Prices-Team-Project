/*
express handles routes for different endpoints ("/", "/ticker", "/listings", "/documentation").
It enables the server to respond with JSON data and handle external API requests using Axios.
*/
const express = require('express');
/*
Axios is used to make HTTP requests to external APIs (https://api.alternative.me/v1/ticker/ and https://api.alternative.me/v2/listings/).
It simplifies the process of fetching data from these external APIs asynchronously.
The responses from these requests are then used to send JSON data back to clients accessing specific routes in the Express application (/ticker, /listings, /documentation).
*/
const axios = require('axios');
/*
CORS (Cross-Origin Resource Sharing) is used to enable cross-origin HTTP requests from the client-side to the server.
It allows the Express server to handle requests coming from different origins (domains) than the one where the server is hosted.
This is essential for web applications, as browsers typically enforce the same-origin policy, restricting requests to the same domain. CORS middleware helps relax these restrictions.
*/
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
//Socket.IO server on port 8000 with CORS allowing all origins
const io = new Server(server, { cors: { origin: "*" } });

//previous port number is const port = 3000; I changed this in case if 3000 is busy during backend deploymenet 
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//route number one index 
app.get('/', (req, res) => {
    //just to see if the server is running
    res.json({ message: 'tested! working.' });
    console.log(res.json());
});

// route number two ticker 
app.get('/ticker', async (req, res) => {
    try {
        //wait for axios to get the API response 
        const response = await axios.get('https://api.alternative.me/v1/ticker/');
        const responseData = response.data;

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
});

//route number three listings 
app.get('/listings', async (req, res) => {
    try {
        //wait for axios to get the API response 
        const response = await axios.get('https://api.alternative.me/v2/listings/');
        const responseData = response.data;

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
});

//route number four documentation
app.get('/documentation', async (req, res) => {
    try {
        //wait for axios to get the API response 
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
