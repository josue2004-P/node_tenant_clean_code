const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const authentication = require("../middlewares/authentication.middleware");
const tenant = require('../middlewares/tenant.middleware');

module.exports = (app) => {
  app.use(
    '/graphql',
    authentication,
    tenant,
    graphqlHTTP((req) => ({
      schema,
      context: { req },
      graphiql: true, // Habilita UI en el navegador
    }))
  );
};
