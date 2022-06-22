const express = require('express');
const cors = require('cors');

require('dotenv').config();

// create server
const app = express();

const port = process.env.PORT || 5000
// middlewares
app.use( cors());
app.use( express.json() ); // parse body

// Routes
app.use('/api/auth', require('./routes/auth') )

app.listen( port, ()=> {
    console.log(`server running in port ${ 4000 }`)
})

