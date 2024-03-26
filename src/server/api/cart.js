const express = require("express");
const cartRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getCartItems,
  createCart,
  createOrder
  
} = require('../db/cart')

// add to cart 
cartRouter.post('/add', async (req, res, next) => {
  const {product_id, order_id, quantity} = req.body;
  try{
    const cartItem = await createCart(order_id, product_id, quantity);
    res.status(201).json(cartItem);
  }catch (error){
    next(error);
  }
})


// create order endpoint
cartRouter.post('/', async (req, res, next) => {
  const { user_id } = req.body;
console.log('recieved user_id', user_id)
  try{
    const order = await createOrder(user_id);
    res.status(201).json(order);
  }catch (err){
    next(err)
  }
})

// create cart endpoint
cartRouter.post('/createcart', async (req, res, next) => {
  const { order_id, product_id, quantity } = req.body;
  try{
    const cartItem = await createCart(order_id, product_id, quantity);
    res.status(201).json(cartItem)
  }catch (err){
    next(err)
  }
})




module.exports = cartRouter