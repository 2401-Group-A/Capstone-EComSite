const express = require("express");
const cartRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getCartItems,
  createCart,
  createOrder,
  getOrderItems,
  getCart,
  getPastOrders,
  addToCart
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

// add item to cart 

cartRouter.post('/addproduct', async (req, res, next) => {
  try{
    const { order_id, product_id, quantity} = req.body
    console.log('this is req.body',req.body)
    await addToCart(order_id, product_id, quantity)
    
    res.status(201).send('This item has been added successfully')
  }catch (err){
    next(err)
  }
})

// Change an items qty in the cart
cartRouter.patch('/editcart', async (req, res, next) => {
try {
  // We need three pieces of info, the cart #, prduct # & qty
  const { order_id, product_id, quantity} = req.body
  await updateCart (order_id, product_id, quantity)
  res.status(201).send('The quantity has been updated for this item.')
} catch (err) {
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