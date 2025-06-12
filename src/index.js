require("dotenv").config();
const express = require("express");

const tenantMiddleware = require("./middlewares/tenant.middleware");
const corsMiddleware = require("./config/cors.config");

// ROUTES
const empresaRoutes = require("./v1/routes/empresa.routes");
const usuariosRoutes = require("./v1/routes/usuarios.routes");

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Directorio Público
app.use(express.static("public"));

app.use(express.json());
app.use(tenantMiddleware);

// RUTA USUARIOS
app.use("/api/v1/empresa", empresaRoutes);
app.use("/api/v1/usuarios", usuariosRoutes);

console.log("Entorno:", process.env.NODE_ENV);
if (process.env.DEBUG === "true") {
  console.log("Modo debug activado");
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
