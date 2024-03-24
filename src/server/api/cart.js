const express = require("express");
const cartRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getCartItems
} = require('../db/cart')

// add to cart 
cartRouter.post('/cart', async (req, res, next) => {
  const {productId, orderId, quantity} = req.body;
  try{
    const cartItem = await getCartItems(orderId, productId, quantity);
    res.status(201).json(cartItem);
  }catch (error){
    next(error);
  }
})