





const createProduct = async (req, res) => {
    console.log('create Products');
  res.send('create Product')
}


const getAllProducts = async (req, res) => {
    console.log('get all Products');
  res.send('get all  products')
}


const getSingleProduct = async(req, res) => {
    console.log()
    res.send('get single product');
}


const updateProduct = async(req, res) => {
    console.log()
    res.send('update Product');
}


const deleteProduct = async(req, res) => {
    console.log()
    res.send('delete Product');
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

