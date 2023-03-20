const CustomErr = require('../error');
const {isTokenValid} = require('../utils');




//authenticate to check if  user  is present, user next  to  move  to  the next route
const authenticateUser = async(req, res, next) => {

    const token = req.signedCookies.token;
  if(!token) {
    // console.log('error, no  token present');
    throw new CustomErr.UnauthenticatedError('Authentication Invalid Token not')
  }else{
    
    //make  sure  the token  is  valid
  try{
    // distructure  data from  payload and return from  user
    const  {name, userId, role} = isTokenValid({token});
    // console.log(payLoad);
    req.user = {name: name, userId: userId, role: role}
     console.log(req.user.role)
    next();

  }catch(err){
    console.log(err)
    throw new CustomErr.UnauthenticatedError('Authentication Invalid after try')
  }
  }

};

const authorizePermissions = (...roles) => {
//     console.log('admin route');
//    if(req.user.role !== 'admin') {
//     console.log(req.user.role)
//     throw new CustomErr.UnauthorizedError('Unauthorized to access this route')
//    }
return (req, resp, next) => {

    if(!roles.includes(req.user.role)) {
        
    throw new CustomErr.UnauthenticatedError(
        'Unauthorized to access this route'
    );
    }
    next();
}


    
};


module.exports={
    authenticateUser,
    authorizePermissions,
};