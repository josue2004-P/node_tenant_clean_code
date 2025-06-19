const EmpresaRepository = require('../../../infrastructure/repositories/EmpresaRepository');
const CreateEmpresa = require('../../../application/use_cases/empresa/CreateEmpresa');
const GetAllEmpresa = require('../../../application/use_cases/empresa/GetAllEmpresa');


const create = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const createEmpresa = CreateEmpresa(empresaRepository);
    const empresa = await createEmpresa(req.body);

    res.status(201).json(empresa);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message || 'Error al crear empresa' });
  }
};

const getAll = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const getAllEmpresas = GetAllEmpresa(empresaRepository);
    const empresas = await getAllEmpresas();

    res.status(201).json(empresas);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message || 'Error al obtener la empresa' });
  }
};

module.exports = {
  create,
  getAll
};
