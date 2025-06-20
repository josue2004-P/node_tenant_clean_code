class EmpresaRepository {
  constructor(EmpresaModel) {
    this.EmpresaModel = EmpresaModel;
  }

  async create(data) {
    const empresa = new this.EmpresaModel(data);
    return await empresa.save();
  }

  async getAll() {
    return await this.EmpresaModel.find();
  }

  async getById(id) {
    return await this.EmpresaModel.findById(id);
  }

  async update(id, data) {
    const updateData = {
      razonSocial: data.razonSocial,
    };

    return await this.EmpresaModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }
  async desactivarEmpresa(id) {
    return await this.EmpresaModel.findByIdAndUpdate(
      id,
      { estatus: "inactiva" },
      { new: true, runValidators: true }
    );
  }
  async activarEmpresa(id) {
    console.log("Activando empresa con ID:", id);

    const result = await this.EmpresaModel.findByIdAndUpdate(
      id,
      { estatus: "activa" },
      { new: true, runValidators: true }
    );

    console.log("Resultado:", result);
    return result;
  }
}

module.exports = EmpresaRepository;
