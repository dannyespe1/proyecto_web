// server/routes/checkout.js
const express = require('express');
const router = express.Router();

// Endpoint para procesar checkout
router.post('/', (req, res) => {
    const { name, email, address } = req.body;
    // Aquí podrías guardar la orden en la base de datos, enviar correo, etc.
    console.log('Nueva orden:', { name, email, address, cart: req.session.cart });

    // Limpiar carrito tras compra
    req.session.cart = {};

    res.json({ success: true });
});

module.exports = router;