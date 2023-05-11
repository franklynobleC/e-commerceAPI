const Product = require('../models/Product');
const User = require('../models/User');
const CustomErr = require('../error/');
const path = require('path');
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
    
  const allProducts =  await Product.find({});
  
  if(!allProducts) {
    throw  new CustomErr.BadRequestError('No data found in Products database')
  }
  
  res.status(StatusCodes.OK).json({products: allProducts, count: allProducts.length})
}


//get a Singel Product
const getSingleProduct = async(req, res) => {
     
       const {id: productId} = req.params;

       if(!productId) {

        throw new CustomErr.BadRequestError('No user found with id', productId)
       }    
    // virtual  property  getting a single review
        const  singleProduct = await Product.findById({_id: productId}).populate('reviews');

    console.log(singleProduct)
    res.status(StatusCodes.OK).json({singleProduct: singleProduct})
}


const updateProduct = async(req, res) => {

   //get userId  from the request params
    const  { id: productId } = req.params;
           
    console.log(productId)
     
    if(req.body ==="" || req.body === null || !req.body) {
        throw new CustomErr.BadRequestError('please enter product information');
    }  
   const updateProduct  = await Product.findOneAndUpdate({_id:productId}, req.body, {
    new: true,
    runValidators: true,
   });

   if(!updateProduct) {
    throw new CustomErr.BadRequestError('product with id', updateProduct, 'not found');
}  
   
    
   await updateProduct.save();
   
     
   res.status(StatusCodes.CREATED).json({productUpdate:updateProduct})
}

const deleteProduct = async(req, res) => {
    const {id: productId} = req.params;

    const deleteProductById = await Product.findOne({_id: productId})
   if(!deleteProductById) {
    throw new CustomErr.BadRequestError('No document with id,' , deleteProductById, 'in database')
   }
   await deleteProductById.remove();

    console.log(deleteProductById)
    res.status(StatusCodes.OK).json({success:'product successfully deleted!'})

}

const uploadImage = async(req, res) => {
    console.log(req.files.image.mimetype);

    if(!req.files) {
        throw new CustomErr.BadRequestError('No file Uploaded')
    }
    const productImage = req.files.image;

   if (!productImage.mimetype.startsWith('image')) {
        throw new CustomErr.BadRequestError('please Upload Image')
    }
  
    //maximum size  of  image is 1MB.
    const maxSize = 1024 * 1024;

    if(productImage.size > maxSize) {
        throw  new CustomErr.BadRequestError('please upload image smaller than 1MB');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)

 await productImage.mv(imagePath);

    console.log(req.files)

    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}`});

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    uploadImage,
    updateProduct
}

