const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./database/config');

require('dotenv').config();

// create server
const app = express();

// conection db
dbConnection();

// public 
app.use( express.static( './public'));

const port = process.env.PORT || 5000
// middlewares
app.use( cors());
app.use( express.json() ); // parse body

// Routes
app.use('/api/auth', require('./routes/auth') )

// management routes from front
app.get('*', ( req, res )=> {
    res.sendFile( path.resolve(__dirname, 'public/index.html'))
})

app.listen( port, ()=> {
    console.log(`server running in port ${ port }`)
})

