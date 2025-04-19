const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    
    try {
        const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(products[0]);
    } catch (error) {
        console.error('Product error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;