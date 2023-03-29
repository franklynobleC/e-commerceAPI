const Product = require('../models/Product');
const User = require('../models/User');
const CustomErr = require('../error/');
const { StatusCodes } = require('http-status-codes');



const createProduct = async (req, res) => {
  
        // set the user to UserId
     req.body.user = req.user.userId;
          
      //request  validation already  covered in the Model
     const ProductSchema =  await Product.create( req.body);
            
        await ProductSchema.save();
       
  res.status(StatusCodes.CREATED).json({product: ProductSchema})
}

//get all Products data
const getAllProducts = async (req, res) => {
    
  const allProducts =  await Product.find();
  
  if(!allProducts) {
    throw  new CustomErr.BadRequestError('No data found in Products database')
  }
  
  res.status(StatusCodes.OK).json({products: allProducts})
}


//get a Singel Product
const getSingleProduct = async(req, res) => {
     
       const productID = req.params.id;

       if(!productID) {

        throw new CustomErr.BadRequestError('No user found with id', productID)
       }      

        const  singleProduct = await Product.findById(productID);

    console.log(singleProduct)
    res.status(StatusCodes.OK).json({singleProduct: singleProduct})
}


const updateProduct = async(req, res) => {


    console.log(req.body);
     
    if(req.body ==="" || req.body === null || !req.body) {
        throw new CustomErr.BadRequestError('please enter product information');
    }  
   const updateProduct  = await Product.findOneAndUpdate(req.body);
    
   await updateProduct.save();
   
     
   res.status(StatusCodes.CREATED).json({productUpdate:updateProduct})
}

const deleteProduct = async(req, res) => {
    const productId = req.params.id;

    const deleteProductById = await Product.findByIdAndDelete(productId)
   if(!deleteProductById) {
    throw new CustomErr.BadRequestError('No document with id,' , deleteProductById, 'in database')
   }

    console.log(deleteProductById)
    res.status(StatusCodes.OK).json({success:'product successfully deleted!'})



}

const uploadImage = async(req, res) => {

    console.log()
    res.send('upload Image');

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    uploadImage,
    updateProduct

}

