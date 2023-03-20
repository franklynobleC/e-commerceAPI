
const { StatusCodes } = require('http-status-codes');


const User = require('../models/User')



const getAllUsers = async (req, res) => {

    console.log(req.user)

   const allUsersInDatabase = await User.find({role:'user'}).select('-password');


    if(!allUsersInDatabase) {

        throw new Error('no User found, an Error occured')

    }
    if(allUsersInDatabase == null) {
        throw new Error('no user Found in Database')
    }     


    res.status(StatusCodes.OK).json({ users: allUsersInDatabase})
      }

const getSingleUser = async (req, res) => {

console.log('--------------------------------------')

       const  id = req.params.id;

       console.log(id)
    const singleUser = await User.findOne({_id: req.params.id}).select('-password');
    console.log(singleUser)

    if (!singleUser) {
   
        res.status(StatusCodes.BAD_REQUEST).json({error:"Error!! user  not found"})
    }

    res.status(StatusCodes.OK).json({user: singleUser})
}

const showCurrentUser = async (req, res)=> {
 console.log(req.user)
 res.status(StatusCodes.OK).json({user: req.user})
}


const updateUser = async(req, res) => {

            let {_id, name, email, role} =  req.body;

             if(!_id || _id ==='') {
                throw new Error('User not Found!')
             }
             if(!name || !email || !role) {
                throw new Error('enter a new email and password')
             }
            
            console.log(name, email, role)


            const singleUser = await User.findById(_id)
                singleUser.name = name ;
               singleUser.email = email;
               singleUser.role = role;

               console.log(singleUser)
           
       
        console.log(singleUser)        



     console.log('update User');
    res.send(singleUser);
}



const updateUserPassword = async(req, res) => {

    console.log('update password');
    res.send("");
}


module.exports ={
 updateUserPassword,
 getAllUsers,
 showCurrentUser,
 getSingleUser,
 updateUser,
}  