const db = require("./client");

// get items from users cart 
async function getCartItems(order_Id, product_Id, quantity) {
  try {
    const { rows } = await db.query(` 
    INSERT INTO order_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *`, [order_Id, product_Id, quantity]);

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

async function createCart(order_id, product_id, quantity){
  try{
    const { rows } = await db.query(
      `INSERT INTO order_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *`, 
      [order_id, product_id, quantity]
    );
    return rows[0]
  }catch(error){
    throw error;
  }
}



module.exports = {
  getCartItems,
  getAllOrders,
  createOrder,
  createCart
};
