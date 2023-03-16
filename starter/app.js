const express = require('express')
require('dotenv').config()
require('express-async-errors');
const DbConnection = require('./db/connectdb');

//routers 
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoutes');

const morgan = require('morgan')
const cookieParser = require('cookie-parser');
// const route = require('./routes/routes');
const {testController, stripeController} = require('./controllers/stripeController')
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handlers');
// const login = require('./controllers/login');
 





const app = express();
app.use(morgan('tiny'))
app.use(express.json()); // gives  access to  data in json using postman
app.use(cookieParser(process.env.JWT_SECRET));



//from userRoute
app.use('/api/v1/users', userRouter);

app.get('/test', testController);
 
app.post('/login', (req, res) => {
   console.log(res.body)
})
app.get('/api/v1', (req,res) => {
   console.log(req.signedCookies);
   res.send('e-commerce api')
});



app.get('/', (req,res) => {
   // console.log(req.cookies);
   res.send('e-commerce api')
});





//from authRoute
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

 const port = process.env.PORT || 4000;


 const  start = async() => {
    
    try {
 const db = await  DbConnection(process.env.MONGO_URI);
  console.log('connection successful' )
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