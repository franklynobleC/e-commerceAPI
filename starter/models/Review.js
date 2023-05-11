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
     required: [true, 'please enter review title'],

        },

        comment : {
            type : String,
            required: [true, 'please enter product comment'],

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

//the user  can  have  only  one  review Per Product
ReviewSchema.index({ product: 1, user: 1}, {unique: true });
 
// Define a static method on the ReviewSchema model that calculates the average rating for a given product ID

 ReviewSchema.statics.calculateAverageRating = async function (productId) {
    // console.log(productId)
    const result = await this.aggregate([
        {$match: {product:productId}},
        {$group:{
            _id:null, averageRating:{$avg:'$rating'},
            numOfReviews:{$sum: 1},
        }}
    ])
    console.log(result);
    try{
    await this.model('Product').findOneAndUpdate(
        {_id: productId},
        {averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
        }
    );
    }catch(error) {
        console.log(error);
    }

 };

ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product);
    
    console.log('post save  hook called');
} );  

ReviewSchema.post('remove', async function() {
    await this.constructor.calculateAverageRating(this.product)


    console.log('post remove hook called');
})

module.exports = mongoose.model('Review', ReviewSchema);