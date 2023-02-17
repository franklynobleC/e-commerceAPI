

const notFound = async(req, resp) => {
    resp.status(404).send('Route does not exist')


}

module.exports = notFound;