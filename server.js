// Import the express function
const express = require('express');

// Import and run dotenv
require('dotenv').config();

// Import body-parser to read POST request
const bodyParser = require('body-parser');

// Import cors for Cross-Origin Resource Sharing
const cors = require('cors');

// Import mongoose to connect to MongoDB
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes.js');
const productRoutes = require('./routes/product-routes.js');

// Create server object by calling express
const server = express();

// Configure express for reading body for POST requests
server.use(bodyParser.urlencoded({ extended: false }));

// Configure express for JSON as well
server.use(bodyParser.json());

// Configure express for CORS
server.use(cors());


// Connect to MongoDB
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

mongoose
.connect( connectionString, connectionConfig )
.then(
    function() {
        console.log('DB is connected')
    }
)
.catch(
    function(dbError) {
        console.log('DB error', dbError)
    }
);

// This is a GET route
server.get('/',
    function(req, res) {
        res.send("Welcome!");
    }
);


server.use(
    '/user', userRoutes
);

server.use(
    '/product', productRoutes
);

server.listen(
    process.env.PORT,
    function() {
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    }
);