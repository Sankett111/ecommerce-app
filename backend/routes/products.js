const express = require('express');
const router = express.Router();
const pool = require('../database/db'); 


router.get('/', async (req, res) => {
    try {
        
        const [products] = await pool.query('SELECT * FROM products');
        
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        res.json(products); 
    } catch (error) {
        console.error('Products retrieval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }

    try {
       
        const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(products[0]); 
    } catch (error) {
        console.error('Product retrieval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
