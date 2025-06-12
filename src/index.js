require("dotenv").config();
const express = require("express");

const corsMiddleware = require("./config/cors.config");

const path = require("path");

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Directorio Público
app.use(express.static("public"));

const tenantMiddleware = require("./middlewares/tenant.middleware");
const userRoutes = require("./v1/routes/user.routes");

app.use(express.json());
app.use(tenantMiddleware);

app.use("/api/usuarios", userRoutes);
// Rutas
// app.use('/api/auth', require('./routes/auth') );

// ADMIN
// app.use('/api/operador', require('./routes/operador'));
// app.use('/api/tecnico', require('./routes/tecnico'));
// app.use('/api/equipo', require('./routes/equipo'));
// app.use('/api/ubicaciones', require('./routes/ubicaciones'));
// app.use('/api/centro-medico', require('./routes/centroMedico'));

//OPERADOR
// app.use('/api/incidencia', require('./routes/incidencia'));

//TECNICO
// app.use('/api/visita-incidencia', require('./routes/visitaIncidencia'));

//TECNICO
// app.use('/api/super-admin', require('./routes/superAdmin'));

console.log("Entorno:", process.env.NODE_ENV);
if (process.env.DEBUG === "true") {
  console.log("Modo debug activado");
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
