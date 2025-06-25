require("dotenv").config();

// CONEXION MONGO
const connectMySQL = require("./infrastructure/mysql/connection");
// const connectMongo = require("./infrastructure/mongo/connection");

const app = require("./app");

const PORT = process.env.PORT || 3000;

async function startServer() {

  // CONEXION A MONGO
  // await connectMongo();

  // CONEXION A MYSQL
  await connectMySQL();

  console.log("Entorno:", process.env.NODE_ENV);
  if (process.env.DEBUG === "true") {
    console.log("Modo debug activado");
  }

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

startServer();
