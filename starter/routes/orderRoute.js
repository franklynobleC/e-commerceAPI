const express = require('express');

const  router = express.Router();

const {authenticateUser, authorizePermissions} = require('../middleware/authentication');


const {createOrder,getAllOrders,getCurrentUserOrders,getSingleOrder,updateOrder} = require('../controllers/orderController');



router.get('/getAllOrder', [authenticateUser, authorizePermissions('admin') ], getAllOrders);
router.post('/createOrder', authenticateUser, createOrder)
router.get('/getCurrentUser', authenticateUser, getCurrentUserOrders)
router.patch('/:id', [authenticateUser ,authorizePermissions('admin','user')], updateOrder);
router.get('/:id', authenticateUser, getSingleOrder)



module.exports = router;