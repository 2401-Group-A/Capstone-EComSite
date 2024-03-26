const db = require("./client");

// get cart 
async function getCart(userId) {
try{
  const {rows} = await db.query(
    `SELECT *
    FROM orders
    WHERE user_id = $1 AND cart = true`,[userId]
  );

  return rows [0];
}catch (err){
  throw err;
}
}
 
// getting cart items 
async function getCartItems(cartId) {
  try{
    const { rows } = await db.query(
      `SELECT *
      FROM order_products 
      WHERE order_id = $1`, [cartId]
    );
    console.log(rows);

    return rows;
  }catch (err){
    throw err;
  }
}

async function getPastOrders(userId) {
  try{
    const {rows} = await db.query(
      `SELECT *
      FROM orders
      WHERE user_id = $1 AND cart = false`,[userId]
    );
  
    return rows;
  }catch (err){
    throw err;
  }
  }

 

// get users cart and past orders --- MAY NOT NEED ----
async function getOrderItems(order_id) {
  try {
    const { rows } = await db.query(` 
    SELECT *
    FROM order_products
    WHERE order_id = $1 `, [order_id]);

    return rows[0];
  } catch (err) {
    throw err;
  }
}

// get all orders from orders table
async function getAllOrders() {
  try{
    const { rows } = await db.query("SELECT * FROM orders")
    return rows;
  }catch (error){
  throw error;
  }
};

// creates new orders
async function createOrder (user_id, orderdate, shippingaddress, cart) {
  try{
    const {rows} = await db.query(
      `INSERT INTO orders (user_id, orderdate, shippingaddress, cart)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [user_id, orderdate, shippingaddress, cart]
    );
    return rows [0];
  }catch (error){
    throw error;
  }

}

// creates the cart when you create a user -- does not need api endpoint
async function createCart(user_id){
  createOrder(user_id, null, null, true)
}




module.exports = {
  getOrderItems,
  getAllOrders,
  createOrder,
  createCart,
  getCart,
  getCartItems,
  getPastOrders
};
