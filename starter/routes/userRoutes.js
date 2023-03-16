
const  express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser,
    showCurrentuser,upDateUser} = require('../controllers/userController');
// const { route } = require('./authRoute');




    router.get('/getAllUsers', getAllUsers)
    router.get('/getSingleUser', getSingleUser)
    router.get('/showCurrentUser', showCurrentuser)
    router.patch('/updateUser', upDateUser)
   

    module.exports = router;
