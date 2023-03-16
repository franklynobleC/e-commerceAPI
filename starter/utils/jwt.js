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




const attachCookiesToResponse =  ({res, user}) => {
    const token = createJWT({payload:user})
   
    const oneDay = 1000 * 60 * 60 * 24;
     // would  only be able to access this site through https secure connection
    // secure:process.env.NODE_ENV === 'production'
      res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production',
        signed: true
    });

    //  res.status(201).json({ user});

   };
    





module.exports = {
    attachCookiesToResponse,
    createJWT,
    isTokenValid,
};


