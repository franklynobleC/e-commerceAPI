require('dotenv').config()  // get  env file 

const express = require('express');
const app = express();
//async errors 
require('express-async-errors');

const stripeController = require('./controllers/stripeController')
 //error handler
 const notFoundMiddleware = require('./middleware/error-handlers');

   
 // make  all the  files  in this  publicy available
//getting data  in json
app.use(express.json())
// app.use(fileUpload());




//routes 


app.post('/stripe', stripeController)

//if error, use  this route 
app.use(notFoundMiddleware)
// app.use(errorMiddleware)

const port = process.env.PORT  || 3000  // if the  port is  undefined, use  port 3000

const start = async() => {
    try {
   

        app.listen(port, console.log(`Server is  listening ${port}...`))
        console.log("from  main")
        // console.log(cloudinary.config.process.env.CLOUD_API_KEY)
    }catch(err) {
        console.log(err.message, 'error Message')
    }
}
start();

