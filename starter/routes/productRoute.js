const express = require('express');

const router = express.Router();

const {getAllProducts, createProduct,deleteProduct,getSingleProduct,uploadImage, updateProduct} = require('../controllers/productController');




router.post('/createProduct', createProduct);
router.get('/getallProduct', getAllProducts);
router.post('/uploadImage', uploadImage)
router.get('/:id', getSingleProduct);
router.delete('/:id', deleteProduct);
router.patch('/updateProduct', updateProduct)



module.exports = router;



