const express = require('express');

const router = express.Router();

const{authenticateUser,authorizePermissions} = require('../middleware/authentication')

const {getAllProducts, createProduct,deleteProduct,getSingleProduct,uploadImage, updateProduct} = require('../controllers/productController');




router.post('/createProduct', [authenticateUser, authorizePermissions('admin')], createProduct);
router.get('/getAllProduct', getAllProducts);
router.post('/uploadImage',  authenticateUser, authorizePermissions('admin'),  uploadImage)
router.get('/:id',   authenticateUser, authorizePermissions('admin'),  getSingleProduct);
router.delete('/:id', authenticateUser, authorizePermissions('admin'), deleteProduct);
router.patch('/:id',authenticateUser, authorizePermissions('admin'),  updateProduct)



module.exports = router;



