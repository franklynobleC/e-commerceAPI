const express = require('express')
require('dotenv').config()
const DbConnection = require('./db/connectdb');

 


const app = express();

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