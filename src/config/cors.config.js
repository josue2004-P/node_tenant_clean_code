const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};


module.exports = cors(corsOptions);