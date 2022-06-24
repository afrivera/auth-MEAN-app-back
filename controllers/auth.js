const { request, response } = require("express");
const { validationResult } = require("express-validator")

const newUser = ( req = request, res = response )=> {
    const errors = validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    const { name, email, password } = req.body;
    return res.json({ ok: true, msg: 'create'});
}

const login = ( req = request, res = response )=> {

    const errors = validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    const { email, password } = req.body;
    return res.json({ ok: true, msg: 'login'});
}

const getToken = ( req = request, res = response )=> {
    return res.json({ ok: true, msg: 'renew'});
}


module.exports = {
    newUser,
    login,
    getToken
};
