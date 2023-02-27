const mongoose = require('mongoose');
const validator = require('validator');




const UserSchema = new mongoose.Schema ({
 name : {
    type: String,
    required: true,
    
 },
 emamil : {
    type: String ,
    required : [true, 'please  provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'please provide a valid email',
    },
  
 },
 password: {
    type : String,
    required : [true, 'Please provide password'],
    minlength: 3,
    maxlength: 50,
 },

 role: {
    type : String,
    enum: ['admin', 'user'],
    default: 'user',
 },

})

module.exports = mongoose.model("User", UserSchema);