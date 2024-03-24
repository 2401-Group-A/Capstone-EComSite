// Database Orders

// Function to create a new order
async function createOrder(userId, cartItems) {
    const { rows: [order] } = await db.query(`
      INSERT INTO orders (user_id, order_date)
      VALUES ($1, NOW())
      RETURNING *;
    `, [userId]);
  
    for (const item of cartItems) {
      await db.query(`
        INSERT INTO order_products (order_id, product_id, quantity)
        VALUES ($1, $2, $3);
      `, [order.id, item.productId, item.quantity]);
    }
  
    return order;
  }
  