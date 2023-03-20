// const router = require("../routes/main")
  const jwt = require('jsonwebtoken')

  const {UnauthenticatedError} = require('../error')




  const authenticationMiddleware = async (req, resp, next) => {
    //check  header

    const  authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
      throw new UnauthenticatedError('Authentication invalid')
          }

          const token = authHeader.split(' ')[1]

          try{
                const  payLoad = jwt.verify(token, process.env.JWT_SECRET)
                 //attach  user to the  jobroutes
                 req.user = {userId: payLoad.userId, name: payLoad.name}
                next()
                }catch(err) {
                console.log('error')
                throw new  UnauthenticatedError('Authenticated invalid')

          }

  }
  module.exports = authenticationMiddleware;

    
