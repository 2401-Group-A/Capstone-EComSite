const db = require("./client");

// get users cart and past orders 
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

async function createCart(user_id){
  createOrder(user_id, null, null, true)
}




module.exports = {
  getOrderItems,
  getAllOrders,
  createOrder,
  createCart
};
