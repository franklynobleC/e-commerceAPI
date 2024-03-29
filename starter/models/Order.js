const  mongoose = require('mongoose');
const SingleOrderItemSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    amount: {type: Number, required: true},
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
});
const OrderSchema =  new mongoose.Schema({

    tax: {
        type: Number,
        required: [true,'please provide tax amount']
    },
    shippingFee: {
        type:Number,
        required: [true,'please provide shipping fee amount']

    },

      orderItems: [SingleOrderItemSchema
],

    status: {
        type: String,
        enum: ['pending', 'paid', 'processed', 'shipped', 'delivered', 'canceled'],
    default: 'pending'
    },
     
    subTotal: {
        type:Number, 
        required: [true, 'please provide subtotal'],
        
    },
    total: {
        type:Number, 
        required: [true, 'please provide total amount']

    },
  
    // orderItems: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Product',
    //         required: true
    //     }
    // ],
    clientSecret: {
        type: String,   
        required: true,
    },
    PaymentIntentId: {
        type:String, 
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'must be a user'],
    }
},

    {timestamps: true}
   
);

module.exports = mongoose.model('Order', OrderSchema);
  