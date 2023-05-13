const Order = require('../models/Order')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomErr = require('../error')
const { checkPermissions } = require('../utils')
const { error } = require('console')


 const fakeStripeAPI = async({amount, currency}) => {
    const client_secret = 'someRandomValue'
    return {client_secret, amount}
 }





// This function creates an order.
const createOrder = async (req, res) => {
  // Get the cart items, tax, and shipping fee from the request body.
  const { items: cartItems, tax, shippingFee } = req.body

  // Validate the request body.
  if (!cartItems || cartItems.length < 0) {
    throw new CustomErr.BadRequestError('No cart items provided')
  }
  if (!tax || !shippingFee) {
    throw new CustomErr.BadRequestError('Please provide tax and shipping fee')
  }

  // Initialize the order items array and subtotal variable.
  let orderItems = []
  let subTotal = 0

  // Iterate over the cart items.
  for (const item of cartItems) {
    // Get the product from the database.
    const dbProduct = await Product.findOne({ _id: item.product })

    // Validate the product.
    if (!dbProduct) {
      throw new CustomErr.NotFoundError(`No product with id: ${item.product}`)
    }

    // Get the product details.
    const { name, price, image, _id } = dbProduct

    // Create a single order item.
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id
    }

    // Add the order item to the order items array.
    orderItems.push(singleOrderItem)

    // Calculate the subtotal.
    subTotal += item.amount * price
  }

  // Calculate the total.
  const total = tax + shippingFee + subTotal

  // Create a payment intent.
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd'
  })

  // Create the order.
  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId
  })

  // Return the order and the client secret.
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.client_secret })
}

// const createOrder = async (req, res) => {
// //   console.log('createOrders console')
//  const {items: cartItems, tax, shippingFee} = req.body;
 
 


//  if(!cartItems || cartItems.length < 0) {
//     throw new CustomErr.BadRequestError('No cart  items  provided');

// }
// if(!tax || !shippingFee) {
//     throw new CustomErr.BadRequestError('please provide tax and  shipping fee')
// }

// let orderItems = []
// let subTotal = 0;

// for(const item of cartItems) {
//     const dbProduect = await Product.findOne({_id: item.product });
//     if(!dbProduect) {
//         throw  new CustomErr.notFoundError(`no product with id: ${item.product}`);
//     }

//     const {name, price, image, _id} = dbProduect
   
//    const singleOrderItem = {
//     amount: item.amount,
//     name,price, image, product: _id,

//    };

//    // add item to order

//    orderItems = [... orderItems, singleOrderItem]
    

//    //calculate subtotal 
//    subTotal += item.amount * price;
// }

// //calculate  the Total

// const total = tax + shippingFee + subTotal

// const paymentIntent = await fakeStripeAPI({
//     amount: total,
//     currency: 'usd',
// });

// const  order = await Order.create({
//     orderItems, total,subTotal, tax,shippingFee, clientSecret:paymentIntent.client_secret,
//     user: req.user.userId,
// });

//  res.status(StatusCodes.CREATED).json({order, clientSecret: order.client_secret });

// }
 
const getSingleOrder = async(req,res) => {

    const {id: orderId} = req.params; 

        if(!orderId) {
            throw new CustomErr.notFoundError('no order id, please enter a  valid  id', orderId )
        }
        const singleOrder = await Order.findOne({_id: orderId})

        if(!singleOrder) {
            throw new CustomErr.notFoundError('id  not found in  Order Table', orderId)
        }
      
     res.status(StatusCodes.OK).json({singleOrder});


}

const getAllOrders = async(req,res) => {
     
    const allOrders = await Order.find({})
      
      if (!allOrders || allOrders.length < 0) {
        throw new CustomErr.notFoundError('No Data Found  in orders Table')
      }   
   res.status(StatusCodes.OK).json({allOrders, count:allOrders.length})


}

const getCurrentUserOrders = async(req,res) => {
    
    if (!req.user.userId) {
        throw  new CustomErr.BadRequestError('No user found')
    }
    req.body.user = req.user.userId;

      const currentUsersOrders = await Order.find({user:req.body.user})    
    
    res.status(StatusCodes.OK).json({currentUserOrder: currentUsersOrders, Count:currentUsersOrders.length})
     
     
}


const updateOrder = async(req,res) => {
     const {id: orderId} = req.params;
     const {paymentIntentId} = req.body;

      const order = await Order.findOne({_id: orderId});
         if(!order) {
            throw new CustomErr.BadRequestError(`Order does not exist with id ${orderId} `)
         }
         checkPermissions(req.user, order.user)
          
         order.PaymentIntentId = paymentIntentId;
         order.status = 'paid'
     console.log('from Update ORDERS')

       await  order.save();
       
       res.status(StatusCodes.OK).json({orderUpdate: order});
}

module.exports = {
    createOrder,
    getAllOrders,
    getCurrentUserOrders,
    getSingleOrder,
    updateOrder,
};