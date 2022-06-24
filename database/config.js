const mongoose = require("mongoose");


const dbConnection = async()=> {

    try {
        mongoose.connect( process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('db online');
        
    } catch (error) {
        console.log(error)
        throw new Error('error in db');
    }
}

module.exports = {
    dbConnection
};
