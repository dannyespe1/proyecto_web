// server/routes/cart.js
const express = require('express');
const pool   = require('../db');
const router = express.Router();

// Obtener carrito actual
router.get('/', (req, res) => {
    res.json(req.session.cart || {});
});

// Añadir al carrito
router.post('/add', (req, res) => {
    const { id, qty } = req.body;
    req.session.cart = req.session.cart || {};
    req.session.cart[id] = (req.session.cart[id] || 0) + parseInt(qty, 10);
    res.json({ success: true, cart: req.session.cart });
});

// Actualizar/cambiar cantidad o eliminar
router.post('/update', (req, res) => {
    const { id, qty } = req.body;
    if (!req.session.cart) return res.json({ cart: {} });
    if (qty > 0) req.session.cart[id] = parseInt(qty, 10);
    else          delete req.session.cart[id];
    res.json({ success: true, cart: req.session.cart });
});

module.exports = router;
