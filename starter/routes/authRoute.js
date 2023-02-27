const expres =  require('express')
const router = expres.Router()
const {   register,
    login,
    logOut } = require('../controllers/authController')


    router.post('/register', register)
    router.post('/login', login)
    router.get('/logout', logOut)


    module.exports = router;