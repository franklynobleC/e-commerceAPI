
const {StatusCodes} = require('http-status-codes')

//errorHandler func
const errorHandlerMiddleware = (err, req, resp, next) => {
    let customError = {
        //set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    // if (err instanceof CustomAPIError) {
    //     return  resp.status(err.statusCode).json({msg: err.message })
    // }
    // // return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})

  if (err.name === 'ValidationError') {

      console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',') 
    console.log('ERROR OBJECT HERE------------------------------',Object.values(err.errors))
   customError.statusCode = 400
  }
if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
     err.keyValue   
    )} field, please choose another value`
  
    customError.statusCode = 400
   
}

if (err.name === 'CastError') {
  customError.msg = `No item  found  with id:  ${err.value}` 
  customError.statusCode = 404
}
//  return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
return resp.status(customError.statusCode).json({msg: customError.msg })
}


module.exports = errorHandlerMiddleware;
