
const { StatusCodes } = require('http-status-codes');
const CustomErr = require('../error');
const {isTokenValid, attachCookiesToResponse, checkPermissions} = require('../utils');


const User = require('../models/User');
const createTokenUser = require('../utils/createTokenUser');



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

      const  id = req.params.id;

       console.log(id)
    const singleUser = await User.findOne({_id: req.params.id}).select('-password');
    // console.log(singleUser)

    if (!singleUser) {
   
        res.status(StatusCodes.BAD_REQUEST).json({error:"Error!! user  not found"})
    }
    checkPermissions(req.user ,singleUser._id);

    res.status(StatusCodes.OK).json({user: singleUser})

}

const showCurrentUser = async (req, res)=> {
 console.log(req.user)
 res.status(StatusCodes.OK).json({user: req.user})
}


const updateUser = async(req, res) => {

        const {name, email} =  req.body;

             if(!email || !name) {
                throw new CustomErr.BadRequestError('Please provide all  values ')
             }   
            
            console.log(name, email)
              const singData = await User.findOneAndUpdate(req.user.userId);
                singData.name = name;
                singData.email = email;                

                await singData.save()
                        
                
              const tokenUser = createTokenUser(singData)             
               
              console.log(tokenUser)
                      attachCookiesToResponse({res, user: tokenUser})
              
        //    console.log(token +"  FROM  TOKEN")

           res.status(StatusCodes.OK).json({user:tokenUser})
        
                   

}


//update With findOneAndUpdate
// // const updateUser1 = async(req,res) => {

// // const {email, name } = req.body ;

// // if(!email || name) {
// //     throw new CustomErr.BadRequestError('please provide all values')
// // }
// // const user = await User.findOneAndUpdate({
// //     _id:req.user.userId},
// //     {email, name},
// //     {new: true, runValidators: true}
// // )


// }



const updateUserPassword = async(req, res) => {

    let { oldpassword,newpassword} = req.body; 
    console.log(oldpassword, newpassword);

   
    if(!oldpassword || !newpassword) {
        throw new CustomErr.BadRequestError('invalid credentials')
    }

  const singleUser = await User.findOne({_id: req.user.userId});

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