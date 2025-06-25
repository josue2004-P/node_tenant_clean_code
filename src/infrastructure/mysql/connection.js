const mysql = require('mysql2/promise');
require('dotenv').config();

const MAX_RETRIES = 10;
const RETRY_INTERVAL_MS = 3000;

let pool;

async function connectMySQL() {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
      });

      await pool.getConnection(); // Intento real
      console.log('✅ Conexión a MySQL exitosa');
      return pool;
    } catch (err) {
      console.warn(`⏳ Intento ${i} de conexión a MySQL fallido. Reintentando en 3s...`);
      await new Promise(res => setTimeout(res, RETRY_INTERVAL_MS));
    }
  }

  throw new Error('❌ No se pudo conectar a MySQL después de múltiples intentos');
}

module.exports = connectMySQL;
