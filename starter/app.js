const express = require('express')
require('dotenv').config()
require('express-async-errors');
const DbConnection = require('./db/connectdb');
// const route = require('./routes/routes');
const {testController, stripeController} = require('./controllers/stripeController')
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handlers');


const app = express();

app.use(express.json()); // gives  access to  data in json using postman
app.get('/test', (req,resp) => {
   resp.send('e-Commerce api');
});



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

 const port = process.env.PORT || 4000;


 const  start = async() => {
    
    try {
 const db = await  DbConnection(process.env.MONGO_URI);
  console.log('connection successful', db)
    }catch(err) {

 console.log('can not connect to DB !!', err)  
    }


    try {
app.listen(port, console.log('Server is  listening', `${port}`))

    }catch (err) {
        console.log('could  not connetc err', err)

    }    
 };

 start();