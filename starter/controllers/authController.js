 const { json } = require('stream/consumers');
const { default: isEmail } = require('validator/lib/isEmail');
const  UserSchema = require('../models/User');
const {StatusCodes} = require('http-status-codes');
//  require('dotenv').config();

const register = async(req, res) => {
      const {name, email, password, user} = req.body;
        if (!name || !email || !password) {
            console.log('please enter a  valid  email')
        
           return   res.json({error: res.error})
        } 
                  

    const UserData = new UserSchema({
        name: name,
         email: email,
        password: password,
        role: user
    })
     
     


    // console.log(req.body)
    console.log(UserData)
        UserSchema.find({email : UserData.email}, (err, docs) => {
            if(docs.length) {
                console.log('email already exist')
                return res.json({error : "email already Exist"})
            }else{
                      
           UserData.save((err) => {
              
            console.log('email created')
            return res.json({userData: UserData})

           });

            }
         });
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