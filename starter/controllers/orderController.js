const { models } = require("mongoose");

const getSingleOrder = async(req,res) => {

console.log('getSingle Order')


}

const getAllOrders = async(req,res) => {
    console.log('getAll Orders');

}

const getCurrentUserOrders = async(req,res) => {
    console.log('getCurrentUserOrders')
}

const createOrder = async(req, res) => {
    console.log('createOrders')
}

const updateOrder = async(req,resp) => {
    console.log('updateOrder')
}

module.exports = {
    createOrder,
    getAllOrders,
    getCurrentUserOrders,
    getSingleOrder,
    updateOrder,
};