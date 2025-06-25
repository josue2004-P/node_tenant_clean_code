const EmpresaRepository = require("../../../infrastructure/mongo/repositories/empresaRepository.mongo");
const CreateEmpresa = require("../../../application/use_cases/empresa/CreateEmpresa");
const GetAllEmpresa = require("../../../application/use_cases/empresa/GetAllEmpresa");
const GetEmpresaById = require("../../../application/use_cases/empresa/GetEmpresaById");
const UpdateEmpresa = require("../../../application/use_cases/empresa/UpdateEmpresa");
const ActivarEmpresa = require("../../../application/use_cases/empresa/ActivarEmpresa");
const DesactivarEmpresa = require("../../../application/use_cases/empresa/DesactivarEmpresa");

const create = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const createEmpresa = CreateEmpresa(empresaRepository);
    const empresa = await createEmpresa(req.body);

    // BORRAR cache de empresas para que se refresque la próxima vez
    await redisClient.del("empresas:all");

    res.status(201).json(empresa);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al crear empresa" });
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
    res
      .status(400)
      .json({ message: error.message || "Error al obtener la empresa" });
  }
};

const getById = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const getEmpresaById = GetEmpresaById(empresaRepository);
    const empresa = await getEmpresaById(req.params.id);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    res.status(200).json(empresa);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al obtener la empresa" });
  }
};

const update = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const updateEmpresa = UpdateEmpresa(empresaRepository);
    const empresa = await updateEmpresa(req.params.id, req.body);

    if (!empresa) {
      return res
        .status(404)
        .json({ message: "Empresa no encontrada para actualizar" });
    }

    await redisClient.del("empresas:all");
    res.status(200).json(empresa);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al actualizar la empresa" });
  }
};

const activarEmpresa = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const activarUseCase = ActivarEmpresa(empresaRepository);
    const success = await activarUseCase(req.params.id);

    if (!success) {
      return res
        .status(404)
        .json({ message: "Empresa no encontrada para activar" });
    }

    await redisClient.del("empresas:all");

    res.status(200).json({ message: "Empresa activada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al activar la empresa" });
  }
};

const desactivarEmpresa = async (req, res) => {
  try {
    const empresaModel = req.Empresa;
    const empresaRepository = new EmpresaRepository(empresaModel);

    const desactivarUseCase = DesactivarEmpresa(empresaRepository);
    const success = await desactivarUseCase(req.params.id);

    if (!success) {
      return res
        .status(404)
        .json({ message: "Empresa no encontrada para eliminar" });
    }

    await redisClient.del("empresas:all");

    res.status(200).json({ message: "Empresa desactivada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al eliminar la empresa" });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  desactivarEmpresa,
  activarEmpresa,
};
