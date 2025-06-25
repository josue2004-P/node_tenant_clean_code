const express = require('express');
const corsMiddleware = require('./config/cors.config');
const tenantMiddleware = require('./interfaces/http/middlewares/tenant.middleware');
const { swaggerUi, specs } = require('./interfaces/http/swagger');

const routes = require('./interfaces/http/routes/index');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./interfaces/http/graphql'); // Asegúrate de tener estos archivos

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('public'));

// MULTITENANT
// app.use(tenantMiddleware);

// GraphQL setup
async function startApollo() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req, 
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}

startApollo();

// Rutas REST y Swagger (después de GraphQL)
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
