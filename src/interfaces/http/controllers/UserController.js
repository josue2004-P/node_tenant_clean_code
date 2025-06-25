const UsuarioRepository = require("../../../infrastructure/mongo/repositories/usuarioRepository.mongo");
const CreateUsuario = require("../../../application/use_cases/usuario/CreateUsuario");
const GetAllUsuario = require("../../../application/use_cases/usuario/GetAllUsuario");

const create = async (req, res) => {
  try {
    const usuarioModel = req.Usuario;
    const usuarioRepository = new UsuarioRepository(usuarioModel);

    const createUsuario = CreateUsuario(usuarioRepository);
    const usuario = await createUsuario(req.body);

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al crear usuario" });
  }
};

const getAll = async (req, res) => {
  try {
    const usuarioModel = req.Usuario;
    const usuarioRepository = new UsuarioRepository(usuarioModel);

    const getAllUsuario = GetAllUsuario(usuarioRepository);
    const usuarios = await getAllUsuario();

    res.status(201).json(usuarios);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error al obtener los usuarios" });
  }
};

module.exports = {
  create,
  getAll,
};
