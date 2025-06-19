const UsuarioRepository = require("../../../infrastructure/repositories/UsuarioRepository");
const LoginUsuario = require("../../../application/use_cases/auth/LoginUsuario");
const RenewToken = require('../../../application/use_cases/auth/RenewToken');

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
  login,
  renewToken
};
