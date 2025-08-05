// server/app.js
require('dotenv').config();
const express    = require('express');
const path       = require('path');
const session    = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors       = require('cors');
const pool       = require('./db');

const productsRouter = require('./routes/products');
const cartRouter     = require('./routes/cart');
const authRouter     = require('./routes/auth');
const checkoutRouter = require('./routes/checkout');

const app = express();

// CORS
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Sesiones
app.use(session({
  key:    'sess_carrito',
  secret: process.env.SESSION_SECRET,
  store:  new MySQLStore({}, pool),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

// API routes
app.use('/api/products', productsRouter);
app.use('/api/cart',     cartRouter);
app.use('/api/auth',     authRouter);
app.use('/api/checkout', checkoutRouter);

// Health check
app.get('/health', (_, res) => res.sendStatus(200));

// 1) Servir estáticos del build de React
app.use(express.static(path.join(__dirname, '../client/build')));

// 2) En cualquier otra ruta, enviar index.html (SPA)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).end();  
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
