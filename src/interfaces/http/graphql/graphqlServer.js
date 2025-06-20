// src/interfaces/http/graphql/graphqlServer.js

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema'); 

const EmpresaRepository = require('../../../infrastructure/repositories/EmpresaRepository');
const UsuarioRepository = require('../../../infrastructure/repositories/UsuarioRepository');

const GetAllEmpresaFactory = require('../../../application/use_cases/empresa/GetAllEmpresa');
const GetAllUsuarioFactory = require('../../../application/use_cases/usuario/GetAllUsuario');


const getTenantModels = require('../middlewares/tenant.graphql'); // ← asegúrate que este archivo exporta bien

async function startApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        getAllEmpresas: async (_, __, context) => {
          const { Empresa } = context;
          const empresaRepository = new EmpresaRepository(Empresa);
          const getAllEmpresas = GetAllEmpresaFactory(empresaRepository);
          return await getAllEmpresas();
        },
      },
    },
    context: async ({ req }) => {
      try {
        return await getTenantModels(req); // Devuelve { Empresa, Usuario, ... }
      } catch (error) {
        console.error('Error en contexto GraphQL:', error.message);
        throw new Error('Error cargando contexto del tenant');
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = startApolloServer;
