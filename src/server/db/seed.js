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
        `);
    await db.query(`
        DROP TABLE IF EXISTS products;
        `);
    await db.query(`
        DROP TABLE IF EXISTS orders;
        `);
    await db.query(`
        DROP TABLE IF EXISTS order_products;
        `);
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

    await db.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          plantType VARCHAR(50),
          plantVariety VARCHAR(50),
          produceType VARCHAR(50),
          matureHeight VARCHAR(50),
          matureWidth VARCHAR(50),
          plantSpacing VARCHAR(50),
          plantingDepth VARCHAR(50),
          maturationTime VARCHAR(50),
          lightRequirements VARCHAR(50),
          imgUrl VARCHAR(255),
          seedCount VARCHAR(50),
          price DECIMAL,
          plantDescription VARCHAR(255),
          plantingInstructions VARCHAR(255)
)`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    await db.query(`
    INSERT INTO users(firstName, lastName, email, password, address, city, state, zipcode)
      VALUES('Josh', 'Mace', 'joshuamace@gmail.com', 'mytemppassword','Some Place', 'Dallas', 'Texas', '75287'),
      ('Brittany', 'Dugger', 'brittany.young2017@outlook.com', 'brittany123','This House', 'Oklahoma City ', 'Oklahoma', '73128'),
      ('Michael', 'Jaroszynski', 'michaeljaroszynski@gmail.com', 'michael12345','The Sticks', 'Romeo', 'Michigan', '48065'),
      ('Raquel', 'Martin','raquel@blacklab.net','raquel123', 'Beach', 'STA', 'Florida', '32092')
      `);
    // Is this were we would have await createUser({name: user.name, email: user.email, password: user.password});
    console.log('User seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

async function addSeeds() {
  await db.query(`
  INSERT INTO products (plantType,
  plantVariety,
  produceType,
  matureHeight,
  matureWidth,
  plantSpacing,
  plantingDepth,
  maturationTime,
  lightRequirements,
  imgUrl,
  seedCount,
  price,
  plantDescription,
  plantingInstructions) 
  VALUES 
  ('Basil', 'Genovese', 'Herb', '18-24 inches', '12-18 inches', '12-18 inches', '¼ inch', '6-8 weeks', 'Full Sun', 'src/client/assets/plants/basil.jpg', NULL, NULL, NULL, 'Sow seeds indoors 4-6 weeks before transplanting, or directly outdoors after danger of frost. Pinch tops to encourage branching.'),
  ('Cilantro', 'Santo Domingo Slow Bolt', 'Herb', '12-18 inches', '6-8 inches', '6-8 inches', '¼ - ½ inch', '4-6 weeks (leaves)', 'Full Sun', 'src/client/assets/plants/cilantro.jpg', '500 Seeds', 5.0, NULL, 'Sow seeds directly outdoors after danger of frost. Keep soil moist.'),
  ('Mint', 'Chocolate', 'Herb', '12-18 inches', '12-18 inches', '18-24 inches (invasive)', '2-3 inches (in pots)', '6-8 weeks', 'Full to Part Sun', 'src/client/assets/plants/mint.jpg', NULL, NULL, NULL, 'Plant in pots or a contained area to prevent spreading. Keep soil moist.'),
  ('Oregano', 'Greek', 'Herb', '18-24 inches', '18-24 inches', '12-18 inches', '¼ inch', '8-10 weeks', 'Full Sun', 'src/client/assets/plants/oregano.jpg', NULL, NULL, NULL, 'Sow seeds indoors 6-8 weeks before transplanting, or directly outdoors after danger of frost.'),
  ('Parsley', 'Italian', 'Herb', '12-18 inches', '8-12 inches', '6-8 inches', '¼ inch', '8-10 weeks', 'Full to Part Sun', 'src/client/assets/plants/parsley.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors after danger of frost. Keep soil moist.'),
  ('Spinach', 'Giant Winter', 'Vegetable', '12-18 inches', '6-8 inches', '4-6 inches', '½ inch', '4-6 weeks', 'Full Sun to Part Shade', 'src/client/assets/plants/spinach.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors in cool weather (spring or fall). Prefers rich soil.'),
  ('Arugula', 'Coltivata', 'Vegetable', '8-12 inches', '4-6 inches', '4-6 inches', '¼ inch', '3-4 weeks', 'Full Sun to Part Shade', 'src/client/assets/plants/arugula.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors in cool weather (spring or fall). Prefers well-drained soil.'),
  ('Pea', 'Sugar Snap', 'Vegetable', '24-36 inches (vining)', 'N/A (requires trellis)', '2-3 inches (single row), 6-8 inches (double row)', '1-2 inches', '60-70 days', 'Full Sun', 'src/client/assets/plants/pea.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors after danger of frost. Provide support for climbing vines.'),
  ('Lettuce', 'Romaine', 'Vegetable', '12-18 inches', '8-12 inches', '8-12 inches', '¼ inch', '4-6 weeks', 'Full Sun to Part Shade', 'src/client/assets/plants/lettuce.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors in cool weather (spring or fall). Prefers well-drained soil.'),
  ('Cabbage', 'Early Dutch', 'Vegetable', '12-18 inches', '12-18 inches', '12-18 inches', '½ inch', '6-8 weeks (planting), 80-100 days (harvest)', 'Full Sun', 'src/client/assets/plants/cabbage.jpg', NULL, NULL, NULL, 'Start seeds indoors 6-8 weeks before transplanting. Prefers cool weather and well-drained soil.'),
  ('Radish', 'Cherry Belle', 'Vegetable', '6-8 inches', '2-3 inches', '2-3 inches', '½ inch', '25-30 days', 'Full Sun', 'src/client/assets/plants/Radish.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors after danger of frost. Prefers loose, well-drained soil.'),
  ('Tomato', 'Cherry Sweet Million', 'Vegetable', '24-36 inches', '18-24 inches', '18-24 inches', '¼ inch', '50-60 days', 'Full Sun', 'src/client/assets/plants/cherry_tomato.jpg', NULL, NULL, NULL, 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Tomato', 'Roma San Marzano', 'Vegetable', '48-60 inches', '24-36 inches', '24-36 inches', '¼ inch', '60-70 days', 'Full Sun', 'src/client/assets/plants/roma_tomato.jpg', NULL, NULL, NULL, 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Tomato', 'Beefsteak Brandywine', 'Vegetable', '48-72 inches', '36-48 inches', '36-48 inches', '¼ inch', '70-80 days', 'Full Sun', 'src/client/assets/plants/beefsteak_tomato.jpg', NULL, NULL, NULL, 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Pepper', 'Green Bell (California Wonder)', 'Vegetable', '24-30 inches', '18-24 inches', '18-24 inches', '¼ - ½ inch', '60-70 days (green), 70-80 days (red)', 'Full Sun', 'src/client/assets/plants/green_bean.jpg', NULL, NULL, NULL, 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Pepper', 'Jalapeño', 'Vegetable', '24-30 inches', '18-24 inches', '18-24 inches', '¼ - ½ inch', '60-70 days', 'Full Sun', 'src/client/assets/plants/jalapeno_pepper.jpg', NULL, NULL, NULL, 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Pepper', 'Orange Habanero', 'Vegetable', '24-36 inches', '18-24 inches', '24-36 inches', '¼ - ½ inch', '100-120 days', 'Full Sun', 'src/client/assets/plants/habanero_pepper.jpg', NULL, NULL, NULL, 'Start seeds indoors 8-10 weeks before transplanting. Stake or cage plants for support. Wear gloves when handling seeds and peppers.'),
  ('Cucumber', 'Bush (Patio Star)', 'Vine Crop', '18-24 inches (bush)', '24-36 inches', '36-48 inches', '½ - 1 inch', '50-60 days', 'Full Sun', 'src/client/assets/plants/cucumber.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors after danger of frost. Hills can be created for better space utilization.'),
  ('Onion', 'Yellow Granex', 'Bulb Vegetable', '12-18 inches', '3-4 inches', '4-6 inches', '1 inch (sets)', '90-100 days', 'Full Sun', 'src/client/assets/plants/onion.jpg', NULL, NULL, NULL, 'Plant onion sets directly outdoors in early spring or fall. Keep soil moist.'),
  ('Zucchini', 'Black Beauty', 'Squash', '24-36 inches', '36-48 inches', '36-48 inches', '1 inch', '45-55 days', 'Full Sun', 'src/client/assets/plants/zucchini.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors after danger of frost. Hills can be created for better space utilization.'),
  ('Bean', 'Green Bean (Bush - Blue Lake)', 'Legume', '18-24 inches (bush)', '12-18 inches', '18-24 inches', '1-2 inches', '50-60 days', 'Full Sun', 'src/client/assets/plants/green_bean.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors after danger of frost.'),
  ('Carrot', 'Danvers Half-Long', 'Root Vegetable', '12-18 inches', '2-3 inches', '2-3 inches (rows), 4-6 inches (between rows)', '½ inch', '60-70 days', 'Full Sun', 'src/client/assets/plants/carrot.jpg', NULL, NULL, NULL, 'Sow seeds directly outdoors in early spring or fall. Prefers loose, well-drained soil. Thin seedlings to allow for proper root development.')
  ;`);
  
}

const seedDatabse = async () => {
  try {
    db.connect();
    console.log('Running seed');
    await dropTables();
    console.log('Dropped Tables');
    await createTables();
    console.log('Created Tables');
    await insertUsers();
    console.log('Added Users');
    await addSeeds();
    console.log('Added Seeds');
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
