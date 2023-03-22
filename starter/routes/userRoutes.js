
const  express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser,
    showCurrentUser,updateUser,updateUserPassword} = require('../controllers/userController');
// const { route } = require('./authRoute');

  const{authenticateUser,authorizePermissions} = require('../middleware/authentication')




    router.get('/', authenticateUser, authorizePermissions('admin','user'),  getAllUsers)
  
  
    router.get('/showMe', authenticateUser, showCurrentUser)
    router.patch('/updateUser',  authenticateUser,  updateUser)
    router.patch('/updateUserPassword', authenticateUser, updateUserPassword)
   
    router.route('/:id').get( authenticateUser, getSingleUser);
  
    module.exports = router;
 