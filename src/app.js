const express = require("express");
const corsMiddleware = require("./config/cors.config");
const tenantMiddleware = require("./interfaces/http/middlewares/tenant.middleware");

const swaggerUi = require("swagger-ui-express");
const specs = require("./interfaces/http/swagger/swagger");

const routes = require("./interfaces/http/routes/index");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./interfaces/http/graphql");

const errorHandler = require("./interfaces/http/middlewares/errorHandler");
const { ApiError } = require("./utils/ApiError");

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("public"));

// MULTITENANT
app.use(tenantMiddleware);

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
  apolloServer.applyMiddleware({ app, path: "/graphql" });
}

startApollo();

// Rutas REST y Swagger (después de GraphQL)
app.use("/api/v1", routes);
app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(specs));

// (Opcional) 404 para rutas REST inexistentes
app.use("*", (req, res, next) =>
  next(new ApiError("Not found", "NOT_FOUND", 404))
);

// >>>> MIDDLEWARE GLOBAL DE ERRORES – último en la cadena <<<<
app.use(errorHandler);

module.exports = app;
