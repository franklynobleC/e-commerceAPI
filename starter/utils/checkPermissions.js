const CustomErr = require('../error');

const checkPermissions = (requestUser, resourceUserId) => {

    console.log(requestUser );  
    console.log(resourceUserId );
    // console.log(typeof  resourcesUserId);
    //if  request role is  equal to  admin, proceed with the function
    if(requestUser.role === 'admin') return ;

    if(requestUser.userId === resourceUserId.toString()) return;

    throw new CustomErr.UnauthorizedError('Not Authorized to access this route')

}; 



module.exports = checkPermissions;