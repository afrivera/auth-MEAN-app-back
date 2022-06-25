const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../helpers/jwt");

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
        const token = await generateToken( dbUser.id, dbUser.name );
        
        // create user in db
        await dbUser.save();
    
        // generate response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
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
       
        const dbUser = await User.findOne({ email });
        if( !dbUser ){
            return res.status(400).json({
                ok: false,
                msg: 'Email or password incorrects'
            })
        }

        // confir password do match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'email or Password incorrects'
            })
        }

        // generate jwt
        const token = await generateToken( dbUser.id, dbUser.name );

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            ok: false, 
            msg: 'please talk with the administrator'
        });
    }

    
}

const getToken = async( req = request, res = response )=> {
    try {
        const { uid } = req;

        const user = await User.findById( uid );

        const token = await generateToken( uid, user.name );

        return res.json({
            ok: true,
            uid,
            name: user.name,
            email: user.email,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'please talk with the administrator'
        });
    }
}


module.exports = {
    newUser,
    login,
    getToken
};
