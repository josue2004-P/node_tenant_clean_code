const UsuarioRepository = require('../../../infrastructure/repositories/UsuarioRepository');
const CreateUsuario = require('../../../application/use_cases/usuario/CreateUsuario');

const create = async (req, res) => {
  try {
    const usuarioModel = req.Usuario;
    const usuarioRepository = new UsuarioRepository(usuarioModel);

    const createUsuario = CreateUsuario(usuarioRepository);
    const usuario = await createUsuario(req.body);

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message || 'Error al crear usuario' });
  }
};

module.exports = {
  create,
};
