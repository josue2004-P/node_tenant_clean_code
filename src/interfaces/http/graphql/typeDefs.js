const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Company {
    id: ID!
    name: String!
  }

  type Query {
    companies: [Company!]!
    hello: String
  }
`;

module.exports = { typeDefs };
