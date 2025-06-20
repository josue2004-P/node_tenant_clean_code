const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const auth = require('../middlewares/auth.middleware');
const tenant = require('../middlewares/tenant.middleware');

module.exports = (app) => {
  app.use(
    '/graphql',
    auth,
    tenant,
    graphqlHTTP((req) => ({
      schema,
      context: { req },
      graphiql: true, // Habilita UI en el navegador
    }))
  );
};
