

const createReview = async(req, res) => {

    res.send('create review')
}

const getAllReviews = async(req, res) => {

    res.send('get all review');
}

const getSingle = async (req, res) => {

    res.send('get single review')
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