const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unAuthenticated');
const UnauthorizedError = require('./unAuthorize');
const notFoundError = require('./not-found');

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
    notFoundError,
}