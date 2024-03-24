const db = require("./client");

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

module.exports = {
  getCartItems,
};
