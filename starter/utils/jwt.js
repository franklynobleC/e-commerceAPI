let jwt = require('jsonwebtoken');
require('dotenv').config()


//create jsonwebToken
const createJWT = ({payload}) => {

    const token  = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    } );

    return token;

}


// function  check if  token  is valid
const isTokenValid = ({token}) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
    createJWT,
    isTokenValid,
};