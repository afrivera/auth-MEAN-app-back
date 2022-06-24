const jwt = require('jsonwebtoken');

const generateToken = ( uid, name ) => {

    const payload = { uid, name };

    return new Promise( (resolve, reject )=> {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, ( err, token )=> {
            if( err ){
                reject(error)
            } else {
                resolve( token )
            }
            
        })
        
    })

}

module.exports = {
    generateToken
};
