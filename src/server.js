const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');

    console.log("Entorno:", process.env.NODE_ENV);
    if (process.env.DEBUG === "true") {
      console.log("Modo debug activado");
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  });
