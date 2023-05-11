// const { default: mongoose } = require('mongoose');

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide product'],
        maxlength:[100, 'Name can not be  morethan 100 characters'] 

    } ,
    price: {
        type: Number,
        required: [true, 'please provide product price'] ,
        default:0
    },
    description : {
        type: String,
        required: [true, 'please provide  Product Description' ],
        maxlength:[500, 'Name can not be  morethan 500 characters'] ,
    },
    image: {
        type: String,
        default: '/uploads/example.jpeg',
        
    },
    category : {
        type: String ,
        required: [true, 'please select  product category'],
        enum: ['office', 'bedroom' ,'kitchen'],
        default: 'office',
    },
    company : {
        type: String ,
        required: [true, 'please select  product category'],
        enum: {
            values:  ['ikea', 'liddy', 'marcos'],
            message: "{VALUE} is  not  supported",
        },
        
    },
     colors: {
        type: [String],
        required: true,
        default: ['#222']

     },

    featured : {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true,
        default: false
    },

    averageRating : {
        type : Number,
        maxlength: [5, 'rating Must not exceed 5'],
           default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0    

    },
    user : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [ true,'must be a user']
 

    },
}, 

   {timestamps: true, toJSON: {virtuals: true}, toObject:{virtuals: true}  },
   
);
// reviews, that is  the Name  on the controller
ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField:'_id',
    foreignField: 'product',
    justOne: false,
    // match: {rating: 5}
});
 
ProductSchema.pre('remove', async function(next) {
    // the  product  is  the name in the model
    await this.model('Review').deleteMany({product: this._id});
})



module.exports = mongoose.model('Product', ProductSchema); 