// server/app.js
require('dotenv').config();
const express    = require('express');
const path       = require('path');
const session    = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors       = require('cors');
const pool       = require('./db');

// Routers
typeof require;
const productsRouter = require('./routes/products');
const cartRouter     = require('./routes/cart');
const authRouter     = require('./routes/auth');
const checkoutRouter = require('./routes/checkout');

const app = express();

// CORS: permite origen dinámico según entorno
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Sesiones (MySQL Store)
app.use(session({
  key: 'sess_carrito',
  secret: process.env.SESSION_SECRET,
  store: new MySQLStore({}, pool),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Endpoints de API\app.use('/api/products', productsRouter);
app.use('/api/cart',     cartRouter);
app.use('/api/auth',     authRouter);
app.use('/api/checkout', checkoutRouter);

// Health check (comprobación de vida)
app.get('/health', (req, res) => res.sendStatus(200));

// Servir estáticos de React
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// SPA Fallback: cualquier ruta no /api devuelve index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));
