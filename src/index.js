const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const corsMiddleware = require('./config/cors.config');


// Crear el servidor de express
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// Base de datos
dbConnection();

app.use(corsMiddleware);

app.use(express.json());

// Directorio Público
app.use( express.static('public') );

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

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


