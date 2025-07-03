const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación",
      version: "1.0.0",
      description: "Documentación generada con Swagger",
    },
    servers: [
      {
        url: "http://admin.localhost:3000",
        description: "Servidor local Admin",
      },
      {
        url: "http://empresa1.localhost:3000",
        description: "Servidor local UsuarioTenant",
      },
    ],
    components: {
      securitySchemes: {
        XTokenAuth: {
          type: "apiKey",
          in: "header",
          name: "x-token",
          description: "Token personalizado para autenticación",
        },
      },
    },
    // Si quieres aplicar x-token a todas las rutas automáticamente:
    // security: [{ XTokenAuth: [] }],
  },
  apis: [
    path.join(__dirname, "../routes/v1/api-docs/*.js"),
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
