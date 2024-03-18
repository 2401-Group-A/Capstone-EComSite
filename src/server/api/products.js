// API Products
const express = require('express');
const productRouter = express.Router();
const {getAllProducts} = require('../db/products');

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



// POST a new product
productRouter.post('/', async (req, res, next) => {
    try {
        await db.addProduct(req.body);
        res.status(201).send('Product added successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = productRouter;