
require('dotenv').config();
const mongooseModel = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const stripeController = async (req, resp) => {
   const {purchase,total_amount,shipping_fee} = req.body;
   
const calculateOrderAmount = () => {
  return total_amount + shipping_fee;
};

const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
});

    console.log(paymentIntent);  
    resp.json({ clientSecret: paymentIntent.client_secret });

    // resp.send('stripe route')

}

const testController = async( req, resp) => {
 
  console.log('from test Controller 1');
  resp.json({ object: resp.body })
}

module.exports = {
  stripeController,
  testController
}  