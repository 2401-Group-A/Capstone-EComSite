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
        if (rows.length === 0) {
            throw new Error('Product not found');
        }
        return rows[0];
    } catch (err) {
        throw err;
    }
 }


// AddProduct
const addProduct = async (productData) => {
    try {
        const { plantType,
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
        plantDescription ,
        plantingInstructions  } = productData;

console.log('data', productData)
        await db.query(`
            INSERT INTO products (plantType, plantVariety, produceType, matureHeight, matureWidth, plantSpacing, plantingDepth, maturationTime, lightRequirements, imgUrl, seedCount, price, plantDescription, plantingInstructions)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
        `, [plantType,
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
            plantDescription ,
            plantingInstructions]);
    } catch (err) {
        throw err;
    }
}

// Delete Product SQL
const deleteProduct = async (productId) => {
  try {
    await db.query('DELETE FROM products WHERE id = $1', [productId]);
  } catch (err) {
    throw err;
  }
};








module.exports = {
    getAllProducts,
    addProduct,
    getSingleProduct,
    deleteProduct,
};
