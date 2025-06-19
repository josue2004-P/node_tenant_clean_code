const express = require('express');
const corsMiddleware = require('./config/cors.config');
const tenantMiddleware = require('./interfaces/http/middlewares/tenant.middleware');
const { swaggerUi, specs } = require('./interfaces/http/swagger');

const routes = require('./interfaces/http/routes/index');

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('public'));

app.use(tenantMiddleware);

app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app; 