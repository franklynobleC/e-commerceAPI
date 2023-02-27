

const register = async(req,res) => {
    res.send('register route User');
};

const login = async(req, res) => {
    res.send('Login user')
};

const logOut = async(req, res) => {
    res.send('Login user')
};



module.exports = {
    register,
    login,
    logOut
};