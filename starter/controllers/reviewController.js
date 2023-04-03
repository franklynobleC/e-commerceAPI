const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes')
const CustomErr = require('../error')
const {
  isTokenValid,
  attachCookiesToResponse,
  checkPermissions
} = require('../utils')


const createReview = async(req, res) => {

    const {product: product} = req.body;
    console.log(product)

    const isValidProduct = await Product.findOne({_id: product });

    if(!isValidProduct) {
        throw new CustomErr.BadRequestError('no id find found')
    }
    //check  if  product  exist using the Product id and  userId
    const alreadySubmitted = await Review.findOne({
        product: product,
        user: req.user.userId
    });
 
if(alreadySubmitted) {
    throw new CustomErr.BadRequestError(
        'Already Submitted review for this Product'
    );
}

req.body.user = req.user.userId;

console.log(req.user)

   const ReviewSchema = await Review.create(req.body);


    res.status(StatusCodes.CREATED).json(ReviewSchema)
}

const getAllReviews = async(req, res) => {
    
   const allReviews = await Review.find({});
   if(!allReviews || allReviews.length === 0) {
    throw new CustomErr.BadRequestError('no document found');

   }
   res.status(StatusCodes.OK).json({AllReviews: allReviews, count: allReviews.length})

}

const getSingle = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    
     
    const singleId = await Review.findById(id);
      if(!singleId) {
        throw new CustomErr.BadRequestError('no id found', singleId)
      }
    res.status(StatusCodes.OK).json({singleReview: singleId})
}

const updateReview = async(req, res) => {
    res.send('update review')
}

const deleteReview = async(req, res) => {

    res.send('delete Review');
};

module.exports = {
   
    createReview,
     getAllReviews,
     getSingle,
     updateReview,
     deleteReview,
}