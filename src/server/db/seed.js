const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    firstname: 'Josh',
    lastname: 'Mace',
    email: 'joshuamace@gmail.com',
    password: 'josh123',
    address: 'Some Place',
    city: 'Dallas',
    state: 'Texas',
    zipcode: '75287',
    admin: 'TRUE',
  },
  {
    firstname: 'Brittany',
    lastname: 'Dugger',
    email: 'brittany.young2017@outlook.com',
    password: 'brittany123',
    address: 'This House',
    city: 'Oklahoma City',
    state: 'Oklahoma',
    zipcode: '73128',
    admin: 'TRUE',
  },
  {
    firstname: 'Michael',
    lastname: 'Jaroszynski',
    email: 'michaeljaroszynski@gmail.com',
    password: 'michael12345',
    address: 'The Sticks',
    city: 'Romeo',
    state: 'Michigan',
    zipcode: '48065',
    admin: 'TRUE',
  },
  {
    firstname: 'Raquel',
    lastname: 'Martin',
    email: 'raquel@blacklab.net',
    password: 'raquel123',
    address: 'Beach',
    city: 'STA',
    state: 'Florida',
    zipcode: '32092',
    admin: 'TRUE',
  },
  {
    firstname: 'Emily',
    lastname: 'Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    address: '123 Home',
    city: 'Detroit',
    state: 'Michigan',
    zipcode: '12345',
    admin: 'FALSE',
  },
  // Add more user objects as needed
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS order_products;
        `);
    await db.query(`
            DROP TABLE IF EXISTS orders;
            `);
    await db.query(`
        DROP TABLE IF EXISTS users;
        `);
    await db.query(`
        DROP TABLE IF EXISTS products;
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
            pastOrders TEXT,
            admin BOOLEAN DEFAULT 'FALSE'
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

    // Foreign key for the 'orders' table is the id (Primary Key) from the 'users' table.
    await db.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          orderDate VARCHAR(50),
          shippingAddress VARCHAR(50),
          cart BOOLEAN default 'TRUE'
          )`);
    await db.query(`
        CREATE TABLE order_products(
          order_id INT NOT NULL,
          product_id INT NOT NULL,
          quantity INT NOT NULL,
          PRIMARY KEY (order_id, product_id),
          FOREIGN KEY (order_id) REFERENCES orders(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
          )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        address: user.address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        admin: user.admin
      });
      console.log('User seed data inserted successfully.');
    }
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
  ('Basil', 'Genovese', 'Herb', '18-24 inches', '12-18 inches', '12-18 inches', '¼ inch', '6-8 weeks', 'Full Sun', 'src/client/assets/plants/basil.jpg', '500 Seeds', 5.99, 'Genovese Basil is a classic Italian vareity known for its intense aroma and flavor. A favorite for making pesto and adds a delightful taste to salads and pasta dishes.', 'Sow seeds indoors 4-6 weeks before transplanting, or directly outdoors after danger of frost. Pinch tops to encourage branching.'),
  ('Cilantro', 'Santo Domingo Slow Bolt', 'Herb', '12-18 inches', '6-8 inches', '6-8 inches', '¼ - ½ inch', '4-6 weeks (leaves)', 'Full Sun', 'src/client/assets/plants/cilantro.jpg', '500 Seeds', 5.99, 'Santo Domingo Slow Bolt Cilantro is prized for its slow-bolting characteristic, allowing for prolonged harvests of its fresh, citrusy leaves.', 'Sow seeds directly outdoors after danger of frost. Keep soil moist.'),
  ('Mint', 'Chocolate', 'Herb', '12-18 inches', '12-18 inches', '18-24 inches (invasive)', '2-3 inches (in pots)', '6-8 weeks', 'Full to Part Sun', 'src/client/assets/plants/mint.jpg', '500 Seeds', 3.99, 'Chocolate Mint offers a unique twist with its delightful chocolate aroma and flavor. It is a versatile herb used in teas, desserts, and savory dishes.', 'Plant in pots or a contained area to prevent spreading. Keep soil moist.'),
  ('Oregano', 'Greek', 'Herb', '18-24 inches', '18-24 inches', '12-18 inches', '¼ inch', '8-10 weeks', 'Full Sun', 'src/client/assets/plants/oregano.jpg', '500 Seeds', 4.99, 'Greek Oregano is a robust herb with a strong, earthy flavor perfect for Mediterranean cuisine.', 'Sow seeds indoors 6-8 weeks before transplanting, or directly outdoors after danger of frost.'),
  ('Parsley', 'Italian', 'Herb', '12-18 inches', '8-12 inches', '6-8 inches', '¼ inch', '8-10 weeks', 'Full to Part Sun', 'src/client/assets/plants/parsley.jpg', '500 Seeds', 6.99, 'Italian Parsley is a flat-leaf variety known for its vibrant flavor and culinary versatility. It is a stable herb in many dishes, including soups, salads, and sauces', 'Sow seeds directly outdoors after danger of frost. Keep soil moist.'),
  ('Spinach', 'Giant Winter', 'Vegetable', '12-18 inches', '6-8 inches', '4-6 inches', '½ inch', '4-6 weeks', 'Full Sun to Part Shade', 'src/client/assets/plants/spinach.jpg', '500 Seeds', 5.99, 'Giant Winter Spinach produces large, tender leaves ideal for fresh salads or cooked dishes.', 'Sow seeds directly outdoors in cool weather (spring or fall). Prefers rich soil.'),
  ('Arugula', 'Coltivata', 'Vegetable', '8-12 inches', '4-6 inches', '4-6 inches', '¼ inch', '3-4 weeks', 'Full Sun to Part Shade', 'src/client/assets/plants/arugula.jpg', '500 Seeds', 4.99, 'Coltivata Arugula offers a peppery flavor and tender leaves, perfect for adding a zing to salads or sandwiches.', 'Sow seeds directly outdoors in cool weather (spring or fall). Prefers well-drained soil.'),
  ('Pea', 'Sugar Snap', 'Vegetable', '24-36 inches (vining)', 'N/A (requires trellis)', '2-3 inches (single row), 6-8 inches (double row)', '1-2 inches', '60-70 days', 'Full Sun', 'src/client/assets/plants/pea.jpg', '500 Seeds', 3.99, 'Sugar Snap Peas produce crisp, sweet pods perfect for snacking or adding to stir-fries', 'Sow seeds directly outdoors after danger of frost. Provide support for climbing vines.'),
  ('Lettuce', 'Romaine', 'Vegetable', '12-18 inches', '8-12 inches', '8-12 inches', '¼ inch', '4-6 weeks', 'Full Sun to Part Shade', 'src/client/assets/plants/lettuce.jpg', '500 Seeds', 6.99, 'Romaine Lettuce is a classic salad green with crisp, upright leaves and a mild flavor.', 'Sow seeds directly outdoors in cool weather (spring or fall). Prefers well-drained soil.'),
  ('Cabbage', 'Early Dutch', 'Vegetable', '12-18 inches', '12-18 inches', '12-18 inches', '½ inch', '6-8 weeks (planting), 80-100 days (harvest)', 'Full Sun', 'src/client/assets/plants/cabbage.jpg', '500 Seeds', 5.99, 'Early Dutch Cabbage is a traditional variety prized for its dense heads and sweet flavor.', 'Start seeds indoors 6-8 weeks before transplanting. Prefers cool weather and well-drained soil.'),
  ('Radish', 'Cherry Belle', 'Vegetable', '6-8 inches', '2-3 inches', '2-3 inches', '½ inch', '25-30 days', 'Full Sun', 'src/client/assets/plants/Radish.jpg', '500 Seeds', 4.99, 'Cherry Belle Radish is a popular heirloom variety known for its vibrant red skin and crisp, white flesh. It has a mild, slightly peppery flavor, making it perfect for fresh salads or garnishes.', 'Sow seeds directly outdoors after danger of frost. Prefers loose, well-drained soil.'),
  ('Tomato', 'Cherry Sweet Million', 'Vegetable', '24-36 inches', '18-24 inches', '18-24 inches', '¼ inch', '50-60 days', 'Full Sun', 'src/client/assets/plants/cherry_tomato.jpg', '500 Seeds', 3.99, 'Cherry Sweet Million Tomato produces abundant clusters of small, sweet cherry tomatoes ideal for snacking, salads, or roasting.', 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Tomato', 'Roma San Marzano', 'Vegetable', '48-60 inches', '24-36 inches', '24-36 inches', '¼ inch', '60-70 days', 'Full Sun', 'src/client/assets/plants/roma_tomato.jpg', '500 Seeds', 6.99, 'Roma San Marzano Tomato is a classic paste tomato with dense, meaty flesh and few seeds, perfect for sauces, canning, and paste.', 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Tomato', 'Beefsteak Brandywine', 'Vegetable', '48-72 inches', '36-48 inches', '36-48 inches', '¼ inch', '70-80 days', 'Full Sun', 'src/client/assets/plants/beefsteak_tomato.jpg', '500 Seeds', 5.99, 'Beefsteak Brandywine Tomato is a renowned heirloom variety prized for its large, flavorful fruit and rich, complex taste.', 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Pepper', 'Green Bell', 'Vegetable', '24-30 inches', '18-24 inches', '18-24 inches', '¼ - ½ inch', '60-70 days (green), 70-80 days (red)', 'Full Sun', 'src/client/assets/plants/bell_pepper.jpg', '500 Seeds', 4.99, 'Green Bell (California Wonder) Pepper produces large, blocky peppers with thick walls and sweet flavor, perfect for stuffing, salads, or grilling.', 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Pepper', 'Jalapeño', 'Vegetable', '24-30 inches', '18-24 inches', '18-24 inches', '¼ - ½ inch', '60-70 days', 'Full Sun', 'src/client/assets/plants/jalapeno_pepper.jpg', '500 Seeds', 6.99, 'Jalapeño Pepper is a popular chili pepper with medium heat and a distinct, spicy flavor.', 'Start seeds indoors 6-8 weeks before transplanting. Stake or cage plants for support.'),
  ('Pepper', 'Orange Habanero', 'Vegetable', '24-36 inches', '18-24 inches', '24-36 inches', '¼ - ½ inch', '100-120 days', 'Full Sun', 'src/client/assets/plants/habanero_pepper.jpg', '500 Seeds', 3.99, 'Orange Habanero Pepper is a fiery-hot chili pepper prized for its intense heat and fruity flavor.', 'Start seeds indoors 8-10 weeks before transplanting. Stake or cage plants for support. Wear gloves when handling seeds and peppers.'),
  ('Cucumber', 'Bush (Patio Star)', 'Vine Crop', '18-24 inches (bush)', '24-36 inches', '36-48 inches', '½ - 1 inch', '50-60 days', 'Full Sun', 'src/client/assets/plants/cucumber.jpg', '500 Seeds', 5.99, 'Bush (Patio Star) Cucumber is a compact, bushy variety perfect for small gardens or containers.', 'Sow seeds directly outdoors after danger of frost. Hills can be created for better space utilization.'),
  ('Onion', 'Yellow Granex', 'Bulb Vegetable', '12-18 inches', '3-4 inches', '4-6 inches', '1 inch (sets)', '90-100 days', 'Full Sun', 'src/client/assets/plants/onion.jpg', '500 Seeds', 4.99, 'Yellow Granex Onion is a sweet, mild onion variety perfect for fresh eating or cooking.', 'Plant onion sets directly outdoors in early spring or fall. Keep soil moist.'),
  ('Zucchini', 'Black Beauty', 'Squash', '24-36 inches', '36-48 inches', '36-48 inches', '1 inch', '45-55 days', 'Full Sun', 'src/client/assets/plants/zucchini.jpg', '500 Seeds', 5.99, 'Black Beauty Zucchini produces dark green, tender fruit perfect for grilling, sautéing, or baking.', 'Sow seeds directly outdoors after danger of frost. Hills can be created for better space utilization.'),
  ('Bean', 'Green Bean (Blue Lake)', 'Legume', '18-24 inches (bush)', '12-18 inches', '18-24 inches', '1-2 inches', '50-60 days', 'Full Sun', 'src/client/assets/plants/green_bean.jpg', '500 Seeds', 3.99, 'Green Bean (Blue Lake) is a classic bush bean variety known for its tender, flavorful pods.', 'Sow seeds directly outdoors after danger of frost.'),
  ('Carrot', 'Danvers Half-Long', 'Root Vegetable', '12-18 inches', '2-3 inches', '2-3 inches (rows), 4-6 inches (between rows)', '½ inch', '60-70 days', 'Full Sun', 'src/client/assets/plants/carrot.jpg', '500 Seeds', 6.99, 'Danvers Half-Long Carrot is a popular heirloom variety recognized for its sweet, juicy roots and excellent storage qualities.', 'Sow seeds directly outdoors in early spring or fall. Prefers loose, well-drained soil. Thin seedlings to allow for proper root development.')
  ;`);
}

async function testOrders(){
  await db.query(`
    INSERT INTO orders (user_id, orderdate, shippingaddress, cart)
    VALUES (1, '2024-03-15', '123 Easy St', true),
    (2, '2024-03-15', '456 Easy St', true),
    (3, '2024-03-15', '789 Easy St', true),
    (3, '2024-03-15', '789 Easy St', true)
    `);
  }
  
  async function testOrdersProducts() {
    await db.query(`
    INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (1, 1, 2),
    (2, 2, 1),
    (2, 1, 1),
    (3, 3, 3)
    `);
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
    await testOrders();
    console.log('Added test orders')
    await testOrdersProducts()
    console.log('Added test orders products')
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
