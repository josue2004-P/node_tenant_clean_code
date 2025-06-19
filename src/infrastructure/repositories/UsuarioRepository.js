class UsuarioRepository {
  constructor(UsuarioModel) {
    this.Usuario = UsuarioModel;
  }

  async create(data) {
    const usuario = new this.Usuario(data);
    return await usuario.save();
  }
}

module.exports = UsuarioRepository;
