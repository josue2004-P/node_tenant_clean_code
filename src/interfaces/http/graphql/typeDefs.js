const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Empresa {
    id: ID!
    nombre: String!
  }
  type Query {
    empresas: [Empresa!]!
    hello: String
  }
`;

module.exports = { typeDefs };
