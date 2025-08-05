// server/routes/auth.js
const express = require('express');
const bcrypt  = require('bcrypt');
const pool    = require('../db');
const router  = express.Router();

// Registro
router.post('/register', async (req, res) => {
    try {
    const { name, email, password } = req.body;
    // Hash de la contraseña
    const hash = await bcrypt.hash(password, 10);
    // Insertar usuario
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, hash]
    );
    // Guardar en sesión
    req.session.user = { id: result.insertId, name, email };
    res.status(201).json({ id: result.insertId, name, email });
    } catch (e) {
    res.status(400).json({ error: e.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
        'SELECT id, name, email, password_hash FROM users WHERE email = ?',
        [email]
    );
    if (!rows.length) return res.status(400).json({ error: 'Credenciales inválidas' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: 'Credenciales inválidas' });

    // Guardar en sesión
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json(req.session.user);
    } catch (e) {
    res.status(500).json({ error: e.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
});

// Obtener usuario actual
router.get('/me', (req, res) => {
    res.json(req.session.user || null);
});

module.exports = router;
