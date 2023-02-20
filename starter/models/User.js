const Mongoose = require('mongoose');



const UserSchema = new Mongoose.Schema [{
 name : {
    type: String,
    required: true,
    
 },
 emamil : {
    type: String ,
    required : true,
 },
 password: {
    type : String,
    required : true,
 },

 role: {
    type : String,
    enum: ['admin', 'user'],
    default: 'user',
 },

}]

module.exports = Mongoose.model("User", UserSchema);