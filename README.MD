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



#### JWT 
- [] require 'jsonwebtoken' package 
- [] create jwt - jwt.sign(payload, secret)
- []  verify jwt - jwt.verify(token,secret)
- [] add variable in  .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [] set it up as  functions in utils
- [] refactor code, create jwt functions  in utils
- [] setup func attachCookiesToResponse
- [] accept payload(tokenUser)
- [] create token, setup cookie
- [] send back the response or  not
- [] create token, setup cookie
- [] send  back the response or  not   


#### Login Route
- [] check if email and password exist, if  one missing return 400

- [] find user,  if  no user return 401
- [] check password,  if does not match cookie
- [] if everything is correct,  attach cookie 
  and  send  back the same response as in  register

  #### Logout Route  
  - [] set token cookie equal to string or null 
  - [] set expires:new Date(Date.Now())

 - ad


#### User Routes Structure

-  [] add userController file 
-  [] export (getAllUsers, getSingleUser, ShowCurrentUser, UpdateUser, upDatePassword) functions
-  [] res.send('some string value')
-  [] setup userroutes file 
-  [] import all controller 
-  [] setup just one routes  - router.route('/').get(getAllUser); 
-  [] import userRoutes as userrouter in the app.js 
-  [] setup app.use('/api/v1/users', userRouter)

- [] Get all users where  role is 'user' and  remove passowrd
-[] Get Single User where id matches id param and  remove password 
- [] if  no user 404

#### updatePassword 

- [] almost identical  to  login  user
- [] add  authenticatenuser middleware in the route 
- [] check  for oldPassword and  newPassword in the Body
- [] look for  user with req.user.userId 
- [] check  if  oldpaassword matches with user.comparePassword 
- [] if no  match 401 
- [] if  everything  is  good user.password equal  to  newPassword


#### Product Model

- [] create Product.js in model folde 
- [] create Schema 
- [] name : {type:String}
- [] price: {type:Number}
- [] description: {type:String}
- [] image: {type:String}
- [] category: {type:String}
- [] company: {type:String}
- [] colors: {type: []}
- [] featured: {type:boolean} 
- [] inventory: {type:Number}
- [] averagerating:{type:Number}
- [] user
- []set timestamps 
- [] export Product Model


#### Product Struture

- [] add productController file in Controllers
- [] export (createProduct, getAllProducts,
  getSingleProduct, updateProduct, deletProduct, uploadImage) functions
- [] res.send('function name')
- [] setup productRoutes file in routes
- [] import all controllers 
- [] only  getAllProducts and getSingleProduct accessible to  public
- [] rest only by admin (setup middleware)
- [] typical setup 
- [] router.route ('/uploadImage').post(uploadImage)
- [] impport productRoutes as productRouter in the app.js 
- [] setup app.us('/api/vi/products', productRouter)

 

 #### create Product 
 - [] create user Property on  req.body and  set  it equal to  userId (req.user)

 - [] pass req.body into Product.create
 - [] send  back  the product

 #### Remaining Controllers (apart from  the  uploadImage)

 - [] getAllProducts
 - [] getSingleProduct
 - [] updateProduct 
 - [] deleteProduct
 - [] typical crud, utilize (task  or  job) project 
 -