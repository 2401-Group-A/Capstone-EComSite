const express = require('express');
const cartRouter = express.Router();
const requireToken = require('./requireToken');
const {
  getCartItems,
  createCart,
  getCart,
  getPastOrders,
  addToCart,
  updateCart,
  deleteCartItem,
  checkout
} = require('../db/cart');

// create cart 
cartRouter.post('/', async (req, res, next) => {
  const { user_id } = req.body;
  console.log('recieved user_id', user_id);
  try {
    const order = await createCart(user_id);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});


// getting cart api endpoint
cartRouter.get('/', requireToken, async (req, res, next) => {
  const user_id = req.user.id;
  try {
    const cart = await getCart(user_id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// getting cart items
cartRouter.get('/cartId/:cartId', requireToken, async (req, res, next) => {
  const user_id = req.user.id;
  console.log(user_id);

  try {
    const cartId = req.params.cartId;
    const produce = await getCartItems(cartId);
    res.json(produce);
  } catch (err) {
    next(err);
  }
});

// getting past orders
cartRouter.get('/orders', requireToken, async (req, res, next) => {
  const user_id = req.user.id;
  console.log('user Id', req.user.id);
  try {
    const pastOrders = await getPastOrders(user_id);
    res.json(pastOrders);
  } catch (err) {
    next(err);
  }
});

// add item to cart

cartRouter.post('/addproduct', async (req, res, next) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    console.log('this is req.body', req.body);
    await addToCart(order_id, product_id, quantity);

    res.status(201).send('This item has been added successfully');
  } catch (err) {
    next(err);
  }
});

// Change an items qty in the cart
cartRouter.patch('/editcart', async (req, res, next) => {
  try {
    // We need three pieces of info, the cart #, prduct # & qty
    const { order_id, product_id, quantity } = req.body;
    await updateCart(order_id, product_id, quantity);
    res.status(201).send('The quantity has been updated for this item.');
  } catch (err) {
    next(err);
  }
});

// Remove an item from your cart

cartRouter.delete('/removeitem', async (req, res, next) => {
  try {
    const { order_id, product_id } = req.body;
    await deleteCartItem(order_id, product_id);
    res.status(201).send('This item has been removed from the cart.');
  } catch (err) {
    next(err);
  }
});



// to checkout we will PATCH the order
cartRouter.patch('/checkout', requireToken, async (req, res, next) => {
  try {
    console.log('this is the body', req.user.id)
    console.log('this is the order id', req.body)
    const {order_id } = req.body;
    const {user_id} = req.user.id;
    await checkout(order_id)
    await createCart(user_id)
    res.status(201).send('This order has be checked out.')
  } catch (err) {
    next(err)
  }
})


module.exports = cartRouter;
