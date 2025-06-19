const express = require('express');
const corsMiddleware = require('./config/cors.config');
const tenantMiddleware = require('./interfaces/http/middlewares/tenant.middleware');

const routes = require('./interfaces/http/routes/index');

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('public'));

app.use(tenantMiddleware);

app.use('/api/v1', routes);

module.exports = app; 