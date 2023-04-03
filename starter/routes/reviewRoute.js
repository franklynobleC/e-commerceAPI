const express = require('express');

const router = express.Router();

const {createReview,
    getAllReviews,
    getSingle,
    updateReview,
    deleteReview } = require('../controllers/reviewController');

    const{authenticateUser,authorizePermissions} = require('../middleware/authentication')


    router.post('/createReview', authenticateUser, authorizePermissions('admin'), createReview);
    
    router.get('/getAllReviews', getAllReviews);
    router.get('/:id', getSingle)
    router.patch('/:id',  authenticateUser, authorizePermissions('admin'),updateReview);
    router.delete('/:id',  authenticateUser, authorizePermissions('admin'), deleteReview);

    module.exports = router;


