

const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')
class NotFoundError extends CustomAPIError {
  constructor (message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}



// const notFound = async(req, resp) => {
//     resp.status(404).send('Route does not exist')


// }

module.exports = NotFoundError;