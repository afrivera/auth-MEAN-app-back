const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const newUser = async( req = request, res = response )=> {
    const { name, email, password } = req.body;

    try {
        // validate email doesnt exist
        const user = await User.findOne({ email });
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'User already exist'
            })
        }
        // create user with model
        const dbUser = new User( req.body );

        // hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );


        // generate JWT
        
        // create user in db
        await dbUser.save();
    
        // generate response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            ok: false, 
            msg: 'please talk with the administrator'
        });
    }
}

const login = async( req = request, res = response )=> {

    const { email, password } = req.body;

    try {
        // validate email doesnt exist
        let user = await User.findOne({ email });
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'User already exist'
            })
        }
        // create user with model
        user = new User( req.body );

        // hash password
    
        // generate JWT
    
        // create user in db

    
        // generate response
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            ok: false, 
            msg: 'please talk with the administrator'
        });
    }

    
}

const getToken = ( req = request, res = response )=> {
    return res.json({ ok: true, msg: 'renew'});
}


module.exports = {
    newUser,
    login,
    getToken
};
