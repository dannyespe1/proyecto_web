// server/db.js
const mysql = require('mysql2/promise');

    const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',             // usuario XAMPP
    password: '',             // contraseña XAMPP por defecto
    database: 'tienda-semestre',
    waitForConnections: true,
    connectionLimit: 10,
        charset: 'utf8mb4',
    decimalNumbers: true 
    });

module.exports = pool;
