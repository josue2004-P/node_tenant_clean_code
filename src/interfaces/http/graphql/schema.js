const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Empresa {
    _id: ID!
    nombre: String!
    activo: Boolean!
  }

  type Query {
    getAllEmpresas: [Empresa]
  }
`;

module.exports = typeDefs;
