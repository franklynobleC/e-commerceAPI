const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes')
const CustomErr = require('../error')
const {
  checkPermissions
} = require('../utils');
const { error } = require('console');


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
    
   const allReviews = await Review.find({})
   .populate({
    path:'product',
    select: 'name company price'})
    .populate({
        path: 'user',
        select: 'name company price'
    });;
    
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
     const {id: reviewId} = req.params;
     const {rating, title, comment} = req.body;

     console.log(rating, title, comment)

     const alreadyExist =  await Review.findById(reviewId);
      
       if(!alreadyExist) {
        console.log(alreadyExist)
        throw  new CustomErr.BadRequestError('error, no resource id found')
       }
       console.log(alreadyExist.user, req.user)
       checkPermissions(req.user, alreadyExist.user)

       alreadyExist.rating = rating;
       alreadyExist.title = title;
        alreadyExist.comment = comment;

       await alreadyExist.save();

       res.status(StatusCodes.CREATED).json({updatedReview: alreadyExist})
    }

const deleteReview = async(req, res) => {
    const {id: reviewId} = req.params 

     console.log('from delete Review');

     const reviewAlreadyExist = await Review.findOne({_id: reviewId});

     if (!reviewAlreadyExist) {
        throw  new CustomErr.BadRequestError('no review with id', reviewAlreadyExist,  'not found')
     }
     // check  permission, only the user === admin, and user
    checkPermissions(req.user, reviewAlreadyExist.user);

     console.log(req.user);
     console.log(reviewAlreadyExist.user);
     console.log(reviewAlreadyExist)
    
     await reviewAlreadyExist.remove()


    res.status(StatusCodes.OK).json({success: "review Successfully deleted!"});
};

const getSingleProductReviews = async(req, res) => {
const {id: productId} = req.params;

console.log('from single product');
  
const reviews = await Review.find({ product:productId});
console.log(reviews);
 res.status(StatusCodes.OK).json({reviews, count: reviews.length});
  
}

module.exports = {
   
     createReview,
     getAllReviews,
     getSingle,
     updateReview,
     deleteReview,
     getSingleProductReviews
}