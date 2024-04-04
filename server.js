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
const app = express();
//previous port number is const port = 3001; I changed this to apply on GitHub pages deployment 
const port = process.env.PORT || 3001;// new port set up according to the environment variable if it exists.

app.use(express.json());
app.use(cors());
 
//route number one index (home page) 
app.get('/index.html', (req, res) => {
    //just to see if the server is running
    res.json({ message: 'tested! working.' });
    console.log(res.json());
});

// route number two ticker for yonas 
app.get('/ticker.html', async (req, res) => {
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

//route number three listings for joshua 
app.get('/listings.html', async (req, res) => {
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

//route number three feedback for Eskadnar 
app.get('/feedback.html', async (req, res) => {
    try {
        //wait for axios to get the API response 
        res.json({ message: 'tested! feedback is working.' });
        console.log(res.json());

    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
});

//app listener 
app.listen(port, () => {
    //make sure tha the server is running properly on port 3000
    console.log(`Server is running on port ${port}`);
});
