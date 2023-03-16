const mongoose = require('mongoose');
const validator = require('validator');
const Bcrypt = require('bcrypt');




const UserSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,    
 },
 email: {
    type: String , 
    unique: true, 
    required: [true, 'please  provide email'],     
    validate: {
      validator: validator.isEmail,
      message: 'please provide a valid email',
    },  
 },
 password: {
    type: String,
    required : [true, 'Please provide password'],
    minlength: 3,
    
 },
 role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
 },



});

UserSchema.pre('save', async function () {
   const salt = await Bcrypt.genSalt(10);
   this.password = await Bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
   const isMatch = await Bcrypt.compare(candidatePassword ,this.password);
    if(!isMatch) {
      throw new Error('error password')
    }
   return isMatch;
};

module.exports = mongoose.model('User', UserSchema);  