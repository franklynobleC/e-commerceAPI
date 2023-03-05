## Hosted Project 

[E-Commerce api Heroku URL]()

## Docgen Command

docgen build -i fileName.json -o index.html

#### Setup basic Express Server

[]import express and  assign to a variable
[]setup start port variable (5000) and  start function 

#### Connect To DB

[] get connection string 
[]  setup .env with MONGO_URL variable and assign the value 
[] import dotenv and  set up package
[]  import connnect() and  invokr in the starter 
[]  restart the server
[]  mongoose v6 info


#### Basic Routes and  Middleware
[]setup  /GET Route 
[] setup express.json() middleware 
[]setup 404 and errorHandler middleware


#### morgan package
--[Morgan Package] (https:www.npm.js.com/package/morgan)

#### User Model 

- [] create  folder and User.js file
- [] create Schema with nam, password, (all typeing)
- [] export mongoose model

#### Validator package 
- [Validator](https//www.npm.js.com/package/validator)

#### Auth routes Structure 
- [] create controller folder 
- [] add athController file
- [] exporet (resgister, login, logout) functions
- [] create routes folder 
- [] setup authRoutes file 
- []  import all routes 
- []  setup all controllers
- []  setup three routes 
- []  post('/register') post('/login') get('logout')





- [] create User 
- []  send response with entire user (only while testing)
- [] check if email already in use(schema and controller)
- []  ignore 'role'
- [] alternative 'admin' setup

#### Handle Password

- [] UserSchema.pre('save') - hook
- this  points  to User
-  bcrypt.genSalt - nu,erb of  rounds
-  bcrypt.hash
