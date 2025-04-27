const express = require('express');
const router = express.Router();
const pool = require('../database/db'); // Ensure this points to the correct pool

// Get all products
router.get('/', async (req, res) => {
    try {
        // Query to fetch all products
        const [products] = await pool.query('SELECT * FROM products');
        
        // Check if there are no products
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        res.json(products); // Return all products as a JSON response
    } catch (error) {
        console.error('Products retrieval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    // Validate productId to make sure it's a number (could be extended for more checks)
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }

    try {
        // Query to fetch the product by its ID
        const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        
        // Check if product is found
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(products[0]); // Return the first matching product
    } catch (error) {
        console.error('Product retrieval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
