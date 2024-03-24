// API Products
const express = require('express');
const productRouter = express.Router();
const {getAllProducts, getSingleProduct, addProduct} = require('../db/products');

// GET all products
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send({products});
    } catch (err) {
        next(err);
    }
});


// Get SingleProduct
productRouter.get('/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await getSingleProduct(productId);
        res.send({ product });
    } catch (err) {
        next(err) 
    }
});



// POST a new product
productRouter.post('/addproduct', async (req, res, next) => {
    try {
        await addProduct(req.body);
        res.status(201).send('Product added successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = productRouter;