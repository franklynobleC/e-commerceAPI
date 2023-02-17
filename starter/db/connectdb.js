const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true ,
        // userCreateIndex: true,
        // userFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB ;