const bcrypt = require('bcryptjs');

class UsuarioRepository {
  constructor(UsuarioModel) {
    this.Usuario = UsuarioModel;
  }

  async findAll() {
    return await this.Usuario.find({});
  }

  async create(data) {
    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const usuario = new this.Usuario(data);
    return await usuario.save();
  }

  async findByEmail(email) {
    return await this.Usuario.findOne({ email });
  }
}

module.exports = UsuarioRepository;
