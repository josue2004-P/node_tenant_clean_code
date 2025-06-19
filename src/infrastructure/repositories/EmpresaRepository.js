class EmpresaRepository {
  constructor(EmpresaModel) {
    this.Empresa = EmpresaModel;
  }

  async create(data) {
    const empresa = new this.Empresa(data);
    return await empresa.save();
  }
}

module.exports = EmpresaRepository;
