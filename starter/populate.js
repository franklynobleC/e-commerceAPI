
//use  this  pcakcage  to populate  data  for  the database

require('dotenv').config()
const connectDB = require('./db/connectdb');


const Product = require('./models/modelsProducts')

const jsonProducts = require('./product.json')

const start = async()=> {

    try {
await connectDB(process.env.MONGO_URI)
  await Product.deleteMany()
  await Product.create(jsonProducts) // populate  this  into the database
  console.log("Success!!") 
  process.exit(0)
    }catch(err) {
        console.log(err)
        process.exit(1)
    }
}
start()
