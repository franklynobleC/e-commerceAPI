const { StatusCodes } = require('http-status-codes');
const { stringify } = require('querystring');
const userModel = require('../models/User')



const getAllUsers = async (req, res) => {

    const allUsersInDatabase = await userModel.find();

    if(!allUsersInDatabase) {

        throw new Error('no User found,  an Error occured')

    }
    if(allUsersInDatabase == null) {
        throw new Error('no user Found in Database')
    }

    console.log(allUsersInDatabase);
    res.status(StatusCodes.OK).json({AllUserData: allUsersInDatabase})

   

}

const getSingleUser = async (req, res) => {
   
     
const id = req.body;

console.log(id)
     
    //  const _i

    const singleUser = await userModel.findById(id)

    console.log(singleUser);
    console.log('get Single Users');
    // res.send('get a SingleUser');

    res.status(StatusCodes.OK).json({"SingleUser":{_id:singleUser.id, name:singleUser.name, email:singleUser.email}})
}

const showCurrentuser = async (req, res)=> {
 console.log('show current User')
 res.send('show current User');
}


const upDateUser = async(req, res) => {
    console.log('update password');
    res.send('update password');
}

module.exports ={
 getAllUsers,
 showCurrentuser,
 getSingleUser,
 upDateUser,
}