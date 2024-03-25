const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  address,
  city,
  state,
  zipcode,
  admin,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(firstname, lastname, email, password, address, city, state, zipcode, admin)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [
        firstname,
        lastname,
        email,
        hashedPassword,
        address,
        city,
        state,
        zipcode,
        admin
      ]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};
// Created this to pull user by ID for Account
const getUserById = async (id) => {
  try {
    const { rows } = await db.query(
      `
    SELECT * FROM users
    WHERE id = $1;`,
      [id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

const getCartByUserId = async (id) => {
  try {
    // Query to fetch user information
    const userResult = await db.query ({
      text: `SELECT id as user_id , firstname, lastname, email
      FROM users
      WHERE id = $1`,
      values: [id],
    });

    // Query to fetch order information
    const orderResult = await db.query({
      text: ` SELECT id as order_id
        FROM orders
        WHERE user_id = $1`,
      values: [id],
    });

    const [user] = userResult.rows;
    const [order] = orderResult.rows; 

    if (!user) {
      return;
    }

    return{
      id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email, 
      order: order ? { id: order.order_id } : null,
    }
  }catch (err){
  throw err;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getCartByUserId
};
