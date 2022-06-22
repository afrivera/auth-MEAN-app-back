const { request, response } = require("express");

const newUser = ( req = request, res = response )=> {
    const { name, email, password } = req.body;
    return res.json({ ok: true, msg: 'create'});
}

const login = ( req = request, res = response )=> {
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
