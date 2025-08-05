// server/app.js
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const pool = require('./db');

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const authRouter    = require('./routes/auth');

const app = express();

// CORS para React (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

// Sesiones en MySQL
const sessionStore = new MySQLStore({}, pool);
app.use(session({
    key: 'sess_carrito',
    secret: 'cambia_este_secreto',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
    }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/auth',     authRouter);

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));

// Rutas de checkout
const checkoutRouter = require('./routes/checkout');
app.use('/api/checkout', checkoutRouter);