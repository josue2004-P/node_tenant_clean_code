const cors = require('cors');
require('dotenv').config();

let origin;

// Si estamos en desarrollo, acepta todos los origins
if (process.env.NODE_ENV === 'development') {
  origin = '*';
} else {
  origin = process.env.FRONTEND_URL || 'http://localhost:3000';
}

const corsOptions = {
  origin,
  credentials: true,
};

module.exports = cors(corsOptions);