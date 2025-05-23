const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// Ambil semua produk + kategori + selling type
app.get('/products', (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.description, p.price, p.image,
           c.name AS category, s.name AS selling_type
    FROM products p
    JOIN categories c ON p.category_id = c.id
    JOIN selling_types s ON p.selling_type_id = s.id
  `;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Detail produk
app.get('/products/:id', (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.description, p.price, p.image,
           c.name AS category, s.name AS selling_type
    FROM products p
    JOIN categories c ON p.category_id = c.id
    JOIN selling_types s ON p.selling_type_id = s.id
    WHERE p.id = ?
  `;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Ambil kategori
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories ORDER BY name', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Ambil selling types
app.get('/selling-types', (req, res) => {
  db.query('SELECT * FROM selling_types ORDER BY name', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
