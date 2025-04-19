const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'database-1.cisfopgowzmb.us-east-1.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'om123456',
    database: process.env.DB_NAME || 'ecommerce_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release();
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await testDbConnection();
    
    // Initialize database tables if they don't exist
    try {
        await initDatabase();
        console.log('Database initialized');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
});

// Initialize database tables
async function initDatabase() {
    const connection = await pool.getConnection();
    
    try {
        // Create users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Create products table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(512),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Insert sample products if table is empty
        const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
        if (products[0].count === 0) {
            await connection.query(`
                INSERT INTO products (name, price, image_url, description)
                VALUES 
                    ('Classic White T-Shirt', 24.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Comfortable 100% cotton white t-shirt'),
                    ('Blue Denim Jeans', 49.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Classic blue denim jeans with modern fit'),
                    ('Black Leather Jacket', 129.99, 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Genuine leather jacket with zipper'),
                    ('Casual Sneakers', 59.99, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Comfortable casual sneakers for everyday wear'),
                    ('Wool Winter Coat', 89.99, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Warm wool coat for winter season'),
                    ('Silk Summer Dress', 65.99, 'https://images.unsplash.com/photo-1539008835657-9e8e9680e956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Elegant silk dress perfect for summer')
            `);
        }
    } finally {
        connection.release();
    }
}
