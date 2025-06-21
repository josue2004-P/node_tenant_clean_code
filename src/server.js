require('dotenv').config();
const { connectDb } = require('./config/database/mongo');
const app = require('./app');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDb();

  console.log("Entorno:", process.env.NODE_ENV);
  if (process.env.DEBUG === "true") {
    console.log("Modo debug activado");
  }

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

startServer();
