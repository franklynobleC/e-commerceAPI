const CustomErr = require('../error');

const checkPermissions = (requestUser, resourcesUserId) => {

    console.log(requestUser );  
    console.log(resourcesUserId );
    // console.log(typeof  resourcesUserId);
    //if  request role is  equal to  admin, proceed with the dunction
    if(requestUser.role === 'admin') return ;

    if(requestUser.userId === resourcesUserId.toString()) return;

    throw new CustomErr.UnauthorizedError('Not Authorized to access this route')

}; 



module.exports = checkPermissions;