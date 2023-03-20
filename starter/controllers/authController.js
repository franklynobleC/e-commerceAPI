 const { json } = require('stream/consumers');
const { default: isEmail } = require('validator/lib/isEmail');
const  UserSchema = require('../models/User');
const {StatusCodes} = require('http-status-codes');
// const Bcrypt = require('bcrypt');
const  jwt =  require('jsonwebtoken');
const  {CustomError} = require('../error');
const { error } = require('console');
const {attachCookiesToResponse} = require('../utils');
const User = require('../models/User');
const Bcrypt = require('bcrypt');
const CustomAPIError = require('../error/custom-error');
 require('dotenv').config();



const register = async(req, res) => {
 
//   const   saltRounds = 10;
      const {name, email, password} = req.body;
        if (!name || !email || !password) {
            console.log('please enter a  valid  email')
        
        
            return   res.json({error: res.error})
        }      
    

    const emailAlreadyExist = await UserSchema.findOne({email});
   
    if (emailAlreadyExist) {
        throw new Error('Email Already Exist')
        // return res.status(StatusCodes.BAD_REQUEST).json({error : error.name})
    }

    
    // first registered user in admin
    const isFirstAccount = (await UserSchema.countDocuments({})) === 0;

     const role =  isFirstAccount ? 'admin' : 'user' ;

      
        const UserData  =    await  UserSchema.create({name, email, password, role})

         const tokenUser = {name: UserData.name, userId:UserData._id, role: UserData.role }

         // UserData.save((err) => {
                  
          //    console.log('email created')
          // the payload  must not contain password .. 
            // const  token =  jwt.sign(tokenUser, 'jwtSecret' ,{expiresIn: '1d'} )

        //   const token = createJWT({payload:tokenUser})
 
         
          //create a cookie and  getting response  in the cookie Object postman
           
    // // console.log(req.body)
    // console.log(UserData)
    //     UserSchema.find({email : UserData.email}, (err, docs) => {
    //         if(docs.length) {
    //             console.log('email already exist')
    //             return res.json({error : "email already Exist"})
           
    //         }else{
                

        //     }
        //  });
        //  }
        res.status(StatusCodes.CREATED).json({user: tokenUser});
       };       

      
       // res.send('register route User')

    const login = async (req, res) => {

        let {email, password} = req.body;
             

             if(!email || !password ) {
                throw new Error('please enter email or passowrd')


              }
              
               let password2 = password
               console.log(password2)

                  
                   const SingleUser = await UserSchema.findOne({email})
               console.log(SingleUser)
                  
            if (!SingleUser) {
              throw new  ('no user found!')             
              ('Invlaid Credentials');
            }                                         
                 
              const  isPasswordCorrect = await SingleUser.comparePassword(password);

              if(!isPasswordCorrect) {
                throw  new CustomError('Invalid Credentislas');

              }
             const tokenUser = {name: SingleUser.name, userId: SingleUser._id, role: SingleUser.role }
              attachCookiesToResponse({res, user:tokenUser });

              res.status(StatusCodes.CREATED).json({user: tokenUser});
            };
    
          // console.log("email is; " + email +"password is " +password)
        
  const logout = async(req, res) => {
   
      res.cookie('token','logout', {
        httpOnly: true ,
        expires: new Date(Date.now()  + 1000* 5),
        signed: false,
      
      });
      res.status(StatusCodes.OK).json({msg: 'User logged out!'});

    };



module.exports = {
    register,
    login,
    logout
};
