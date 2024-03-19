// Database Products 
const db = require('./client');

// AllProducts 
const getAllProducts = async () => {
    try {
        const { rows } = await db.query(`
            SELECT *
            FROM products;
        `);
        return rows;
    } catch (err) {
        throw err;
    }
}

// SingleProduct 
const getSingleProduct = async (productId) => {
    try {
        const { rows } = await db.query(`
        SELECT * 
        FROM products
        WHERE id = $1;
        `, [productId]);
        if (rows.length === 0) 
    }
}


// AddProduct
const addProduct = async (productData) => {
    try {
        const { planttype, plantvariety, producetype, matureheight, maturewidth, plantspacing, plantingdepth, maturationtime, lightrequirements, imgurl, seedcount, price, plantdescription, plantinginstructions } = productData;

        await db.query(`
            INSERT INTO products (planttype, plantvariety, producetype, matureheight, maturewidth, plantspacing, plantingdepth, maturationtime, lightrequirements, imgurl, seedcount, price, plantdescription, plantinginstructions)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
        `, [planttype, plantvariety, producetype, matureheight, maturewidth, plantspacing, plantingdepth, maturationtime, lightrequirements, imgurl, seedcount, price, plantdescription, plantinginstructions]);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllProducts,
    addProduct
};
