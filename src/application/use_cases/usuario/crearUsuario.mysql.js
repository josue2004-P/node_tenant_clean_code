const Usuario = require('../../../domain/models/Usuario');

module.exports = (repo) => async (data) => {
  const usuario = await repo.crearUsuario(data);
  return new Usuario(usuario);
};
