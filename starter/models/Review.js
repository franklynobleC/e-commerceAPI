const mongoose = require('mongoose');




const ReviewSchema = new mongoose.Schema({

    rating : {
        type: Number,
        required: [true, 'please enter a valid rating'],
        min:1,
        max: 5,
        default: 1,      
    },
    title : {
     type : String,
     comment : String,
        },

        user: {
           type : mongoose.Schema.ObjectId,
           ref: 'User',
           required: [true, 'must be a user']
        },

        product : {
            type : mongoose.Schema.ObjectId,
            ref : 'Product',
            required : [true, 'please add a product'],
        }
    },

    {timestamps: true},
    
    

);
module.exports = mongoose.model('Review', ReviewSchema);