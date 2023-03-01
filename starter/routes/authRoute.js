const expres =  require('express')
const router = expres.Router()
const {   register,
    login,
    logout } = require('../controllers/authController')


    router.post('/register', register)
    router.post('/login', login)
    router.get('/logout', logout)


    module.exports = router;