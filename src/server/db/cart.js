const db = require('./client');

// creates new orders --- does not need api endpoint
async function createOrder(user_id, orderdate, shippingaddress, cart) {
  try {
    const { rows } = await db.query(
      `INSERT INTO orders (user_id, orderdate, shippingaddress, cart)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [user_id, orderdate, shippingaddress, cart]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// creates the cart when you create a user -- 
async function createCart(user_id) {
  createOrder(user_id, null, null, true);
}


// get cart
async function getCart(userId) {
  try {
    const { rows } = await db.query(
      `SELECT *
    FROM orders
    WHERE user_id = $1 AND cart = true`,
      [userId]
    );

    return rows[0];
  } catch (err) {
    throw err;
  }
}

// getting cart items
async function getCartItems(cartId) {
  try {
    const { rows } = await db.query(
      `SELECT *
      FROM order_products 
      WHERE order_id = $1`,
      [cartId]
    );
    console.log(rows);

    return rows;
  } catch (err) {
    throw err;
  }
}

// past orders
async function getPastOrders(userId) {
  try {
    const { rows } = await db.query(
      `SELECT *
      FROM orders
      WHERE user_id = $1 AND cart = false`,
      [userId]
    );

    return rows;
  } catch (err) {
    throw err;
  }
}

// add item to cart

async function addToCart(order_id, product_id, quantity) {
  try {
    await db.query(
      `INSERT INTO order_products(order_id, product_id, quantity)
      VALUES ($1, $2, $3)`,
      [order_id, product_id, quantity]
    );
  } catch (err) {
    throw err;
  }
}

 // Update cart quantity
async function updateCart (order_id, product_id, quantity){ 
  try{
      await db.query(
      `UPDATE order_products 
      SET quantity = $3 WHERE order_id = $1 AND product_id = $2`, [order_id, product_id, quantity]
    );
    
  }catch (err){
    throw err;
  }
}


// delete items from cart 

const deleteCartItem = async (order_id, product_id) => {
  try{
    await db.query(`
    DELETE FROM order_products 
    WHERE order_id = $1 AND product_id = $2`, [order_id, product_id]);

  }catch(err){
    throw err;
  }
}



// get users cart and past orders --- MAY NOT NEED ----
async function getOrderItems(order_id) {
  try {
    const { rows } = await db.query(
      ` 
    SELECT *
    FROM order_products
    WHERE order_id = $1 `,
      [order_id]
    );

    return rows[0];
  } catch (err) {
    throw err;
  }
}





const checkout = async (id) => {
  await db.query(
    `UPDATE orders
    SET cart = false 
    WHERE id = $1 `, [id]
    );
}

module.exports = {
  getOrderItems,
  createOrder,
  createCart,
  getCart,
  getCartItems,
  getPastOrders,
  addToCart,
  updateCart,
  deleteCartItem,
  checkout
};
