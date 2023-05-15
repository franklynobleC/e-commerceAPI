const express = require('express')
require('dotenv').config()
require('express-async-errors');
const DbConnection = require('./db/connectdb');


//authRouters 
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute')


//ProductRoute
const productRoute = require('./routes/productRoute');


//orderRouter
const orderRoute = require('./routes/orderRoute');

const morgan = require('morgan')
const cookieParser = require('cookie-parser');
 // file upload import 
 const fileUpload = require('express-fileupload');

// const route = require('./routes/routes');
const {testController, stripeController} = require('./controllers/stripeController')
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handlers');
// const login = require('./controllers/login');

//before deploy for security, patches
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
 


const app = express();
app.use(morgan('tiny'))


app.set('trust proxy')

app.use(
  rateLimiter({
    windows: 15 * 60 * 1000,
    max: 60
  })
)

app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json()); // gives  access to  data in json using postman
app.use(cookieParser(process.env.JWT_SECRET));

//make  this file public
app.use(express.static('./public'))

app.use(fileUpload());

app.use('/api/v1/reviews', reviewRouter);

//from productRoute
app.use('/api/v1/products', productRoute);

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

//from productRoute
app.use('/api/v1/products', productRoute);

//from userRoute
app.use('/api/v1/users', userRouter);


//from orderRoute
app.use('/api/v1/orders',orderRoute);
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