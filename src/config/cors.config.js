const cors = require('cors');
require('dotenv').config();

const allowedOrigins = [
  'http://admin.localhost:3001',
  'http://empresa1.localhost:3001',
  'http://localhost:3001', // si usas frontend sin subdominio
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // peticiones server-side o Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = cors(corsOptions);
