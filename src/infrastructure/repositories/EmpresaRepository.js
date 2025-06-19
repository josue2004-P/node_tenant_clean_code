class EmpresaRepository {
  constructor(EmpresaModel) {
    this.Empresa = EmpresaModel;
  }

  async findAll() {
    return await this.Empresa.find({});
  }

  async create(data) {
    const empresa = new this.Empresa(data);
    return await empresa.save();
  }
}

module.exports = EmpresaRepository;