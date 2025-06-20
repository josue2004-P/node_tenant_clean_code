const EmpresaModel = require('../../domain/models/Empresa');
const EmpresaRepository = require('../../infrastructure/repositories/EmpresaRepository');
const GetAllEmpresaFactory = require('../../application/use_cases/empresa/GetAllEmpresa');

const empresaRepository = new EmpresaRepository(EmpresaModel);
const getAllEmpresa = GetAllEmpresaFactory(empresaRepository);

const resolvers = {
  Query: {
    getAllEmpresas: async () => {
      return await getAllEmpresa();
    },
  },
};

module.exports = resolvers;