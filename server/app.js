// server/app.js
require('dotenv').config();

const express    = require('express');
const session    = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors       = require('cors');
const pool       = require('./db');

const productsRouter = require('./routes/products');
const cartRouter     = require('./routes/cart');
const authRouter     = require('./routes/auth');
const checkoutRouter = require('./routes/checkout');

const app = express();

// CORS: solo tu frontend
const FRONTEND_URL = (process.env.FRONTEND_URL || '').trim().replace(/\/+$/, '');
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.set('trust proxy', 1);

app.use(session({
  key:    'sess_carrito',
  secret: process.env.SESSION_SECRET || 'default_secret',
  store:  new MySQLStore({}, pool),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,              // 1 hora
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  }
}));

// Rutas de API
app.use('/api/products', productsRouter);
app.use('/api/cart',     cartRouter);
app.use('/api/auth',     authRouter);
app.use('/api/checkout', checkoutRouter);

// Health check
app.get('/health', (req, res) => res.sendStatus(200));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
