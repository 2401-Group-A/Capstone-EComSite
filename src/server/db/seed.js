const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users;
        `)
    await db.query(`
        DROP TABLE IF EXISTS products;
        `)
    await db.query(`
        DROP TABLE IF EXISTS orders;
        `)
    await db.query(`
        DROP TABLE IF EXISTS order_products;
        `)
        ;
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(50) DEFAULT 'firstname',
            lastName VARCHAR(50) DEFAULT 'lastname',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zipcode VARCHAR(5) NOT NULL,
            userCart TEXT,
            pastOrders TEXT
        )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
