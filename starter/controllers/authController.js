 const { json } = require('stream/consumers');
const { default: isEmail } = require('validator/lib/isEmail');
const  UserSchema = require('../models/User');
const {StatusCodes} = require('http-status-codes');
// const Bcrypt = require('bcrypt');
const  jwt =  require('jsonwebtoken');
const  {CustomError} = require('../error');
const { error } = require('console');
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


            const  token =  jwt.sign(tokenUser, 'jwtSecret' ,{expiresIn: '1d'} )
           return  res.status(StatusCodes.CREATED).json({ tokenUser, token});
            
        
    //  } )

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
       }          

      
       // res.send('register route User')

const login = async(req, res) => {
    res.send('login user')
};

const logout = async(req, res) => {
    res.send('logOut user')
};



module.exports = {
    register,
    login,
    logout
}; 