const express = require("express");
const cartRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getCartItems,
  createCart,
  createOrder,
  getOrderItems,
  getCart,
  getPastOrders
} = require('../db/cart')


// getting cart api endpoint
cartRouter.get('/', requireToken, async (req, res, next) => {
  const user_id = req.user.id
  try{
   const cart = await getCart(user_id);
   res.json(cart);
  }catch (err){
    next(err)
  }
})

// getting cart items 
cartRouter.get('/cartId/:cartId', requireToken, async (req, res, next) => {
  const user_id = req.user.id;
  console.log(user_id)

  try{
    const cartId = req.params.cartId;
    const produce = await getCartItems(cartId);
    res.json(produce);
  }catch (err){
    next (err);
  }
})


// getting past orders 
cartRouter.get('/orders', requireToken, async (req, res, next) => {
  const user_id = req.user.id
  console.log('user Id', req.user.id)
  try{
   const pastOrders = await getPastOrders(user_id);
   res.json(pastOrders);
  }catch (err){
    next(err); 
  }
} )


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