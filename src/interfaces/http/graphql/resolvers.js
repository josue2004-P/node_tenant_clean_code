const GetAllEmpresa = require("../../../application/use_cases/empresa/GetAllEmpresa");
const EmpresaRepository = require("../../../infrastructure/repositories/EmpresaRepository");

const resolvers = {
  Query: {
    empresas: async (parent, args, context) => {
      // Aquí puedes acceder a context.req.Empresa
      const empresaModel = context.req.Empresa;
      const empresaRepository = new EmpresaRepository(empresaModel);

      const getAllEmpresas = GetAllEmpresa(empresaRepository);
      return await getAllEmpresas();
    },
  },
  Empresa: {
    id: (parent) => parent._id.toString(),
  },
};

module.exports = { resolvers };