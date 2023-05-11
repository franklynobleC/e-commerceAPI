const express = require('express');

const  router = express.Router();

const {authenticateUser, authorizePermissions} = require('../middleware/authentication');


const {createOrder,getAllOrders,getCurrentUserOrders,getSingleOrder,updateOrder} = require('../controllers/orderController');



router.get('/getAllOrders', [authenticateUser, authorizePermissions('admin') ], getAllOrders);
router.get('/getSingleOrder', authenticateUser, getSingleOrder);
router.post('/createOrder', authenticateUser, createOrder);