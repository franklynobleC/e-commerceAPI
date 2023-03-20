
const { StatusCodes } = require('http-status-codes');
const CustomErr = require('../error');


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

    let { oldpassword,newpassword} = req.body; 
    console.log(oldpassword, newpassword) // console.log(req.user.userId)

   
    if(!oldpassword || !newpassword) {
        throw new CustomErr.BadRequestError('invalid credentials')
    }

  const singleUser = await User.findOne({_id: req.user.userId});
   console.log(singleUser + " &&&&&&&&7")

    console.log(singleUser)

       
 const  isPasswordCorrect = await singleUser.comparePassword(oldpassword);
         
 if(!isPasswordCorrect) {
   throw new CustomErr.UnauthenticatedError('User error! not Authenticated');
 }
            
       singleUser.password = newpassword;
          
        await singleUser.save();

        //  console.log(ts)
        console.log(singleUser + " ------------===")


    // console.log(t1 +"new password is:  "+ password)
    res.status(StatusCodes.OK).json({user:singleUser.name, email: singleUser.email, _id: singleUser.id});
}


module.exports ={
 updateUserPassword,
 getAllUsers,
 showCurrentUser,
 getSingleUser,
 updateUser,
}  