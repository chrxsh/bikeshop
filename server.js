const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Create database connection inline for testing
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bikeshop'
});

app.use(cors());
app.use(express.static('public'));

// Test server
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Test database connection
app.get('/test-db', (req, res) => {
  console.log('Testing database connection...');
  
  db.query('SELECT 1 as test', (err, result) => {
    if (err) {
      console.error('Database test failed:', err);
      return res.status(500).json({ 
        error: 'Database connection failed', 
        details: err.message,
        code: err.code
      });
    }
    console.log('Database test successful:', result);
    res.json({ message: 'Database connected successfully', result });
  });
});

// Test category and selling_type tables
app.get('/test-lookup', (req, res) => {
  console.log('Testing lookup tables...');
  
  const categoryQuery = 'SELECT * FROM category';
  const sellingQuery = 'SELECT * FROM selling_type';
  
  db.query(categoryQuery, (err, categories) => {
    if (err) {
      console.error('Category query failed:', err);
      return res.status(500).json({ error: 'Category table error', details: err.message });
    }
    
    db.query(sellingQuery, (err, sellingTypes) => {
      if (err) {
        console.error('Selling type query failed:', err);
        return res.status(500).json({ error: 'Selling type table error', details: err.message });
      }
      
      console.log('Lookup tables test successful');
      console.log('Categories:', categories);
      console.log('Selling types:', sellingTypes);
      
      res.json({ 
        message: 'Lookup tables accessible',
        categories,
        sellingTypes
      });
    });
  });
});

// Get all products with category and selling type names
app.get('/product', (req, res) => {
  console.log('Getting all products with joins...');
  
  let sql = `
    SELECT 
      p.product_id as id,
      p.product_name as name,
      p.product_desc as description,
      p.product_price as price,
      p.image_url as image,
      c.name as category,
      s.name as selling_type
    FROM product p
    LEFT JOIN category c ON p.category_id = c.category_id
    LEFT JOIN selling_type s ON p.selling_id = s.selling_id
  `;
  
  const params = [];
  
  if (req.query.filter && req.query.filter !== 'All') {
    sql += ' WHERE s.name = ?';
    params.push(req.query.filter);
  }
  
  console.log('Executing SQL:', sql);
  console.log('With params:', params);
  
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error('Product join query failed:', err);
      return res.status(500).json({ 
        error: 'Database error', 
        details: err.message,
        code: err.code,
        sqlMessage: err.sqlMessage
      });
    }
    
    console.log('Product join query successful. Found', rows.length, 'products');
    console.log('First product with joins:', rows[0]);
    res.json(rows);
  });
});

// Get single product by ID
app.get('/product/:id', (req, res) => {
  console.log('Getting product by ID:', req.params.id);
  
  const sql = `
    SELECT 
      p.product_id as id,
      p.product_name as name,
      p.product_desc as description,
      p.product_price as price,
      p.image_url as image,
      c.name as category,
      s.name as selling_type
    FROM product p
    LEFT JOIN category c ON p.category_id = c.category_id
    LEFT JOIN selling_type s ON p.selling_id = s.selling_id
    WHERE p.product_id = ?
  `;
  
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Single product query failed:', err);
      return res.status(500).json({ 
        error: 'Database error', 
        details: err.message 
      });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log('Single product found:', result[0]);
    res.json(result[0]);
  });
});

// Start server with error handling
app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    return;
  }
  
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('\nTest these URLs:');
  console.log(`http://localhost:${PORT}/`);
  console.log(`http://localhost:${PORT}/test-db`);
  console.log(`http://localhost:${PORT}/test-lookup`);
  console.log(`http://localhost:${PORT}/product`);
  console.log(`http://localhost:${PORT}/product/1`);
  
  // Test database connection on startup
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed on startup:', err);
    } else {
      console.log('Database connected successfully on startup');
    }
  });
});