const UsuarioRepository = require("../../../infrastructure/repositories/UsuarioRepository");
const CreateUsuario = require("../../../application/use_cases/usuario/CreateUsuario");
const GetAllUsuario = require("../../../application/use_cases/usuario/GetAllUsuario");
const LoginUsuario = require("../../../application/use_cases/usuario/LoginUsuario");
const RenewToken = require('../../../application/use_cases/usuario/RenewToken');

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

const login = async (req, res) => {
  try {
    const usuarioModel = req.Usuario;
    const usuarioRepository = new UsuarioRepository(usuarioModel);

    const loginUsuario = LoginUsuario(usuarioRepository);
    const result = await loginUsuario(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const renewToken = async (req, res) => {
  try {
    const useCase = RenewToken();
    const result = await useCase(req.user); // req.user viene del middleware
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'No se pudo renovar el token' });
  }
};

module.exports = {
  create,
  getAll,
  login,
  renewToken
};
