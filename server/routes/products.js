// server/routes/products.js
const express = require('express');
const pool   = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
    } catch (e) {
    res.status(500).json({ error: e.message });
    }
});
// GET product by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
        'SELECT * FROM products WHERE id = ?',
        [req.params.id]
        );
        if (rows.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
    
module.exports = router;
