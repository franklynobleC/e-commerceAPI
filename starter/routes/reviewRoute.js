const express = require('express');

const router = express.Router();

const {createReview,
    getAllReviews,
    getSingle,
    updateReview,
    deleteReview } = require('../controllers/reviewController');

    const{authenticateUser,authorizePermission} = require('../middleware/authentication')


    router.post('/createReview', authenticateUser, createReview);
    
    router.get('/getAllReviews', getAllReviews);
    router.get('/:id', getSingle)
    router.patch('/:id',  authenticateUser,updateReview);
    router.delete('/:id',  authenticateUser, deleteReview);

    module.exports = router;


