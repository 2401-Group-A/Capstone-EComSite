const express = require("express");
const cartRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getCartItems,
  createCart,
  createOrder,
  getOrderItems
  
} = require('../db/cart')



cartRouter.get('/', requireToken, async (req, res, next) => {
  const user_id = req.user.id
  try{
    
    const orderItems = await getOrderItems(order_id);
    res.json(orderItems);

  }catch (err){
    next(err)
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





module.exports = cartRouter