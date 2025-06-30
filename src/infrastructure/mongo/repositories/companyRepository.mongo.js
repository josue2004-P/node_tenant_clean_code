class CompanyRepository {
  constructor(CompanyModel) {
    this.CompanyModel = CompanyModel;
  }

  async create(data) {
    const company = new this.CompanyModel(data);
    return await company.save();
  }

  async getAll() {
    return await this.CompanyModel.find();
  }

  async getById(id) {
    return await this.CompanyModel.findById(id);
  }

  async update(id, data) {
    const updateData = {
      razonSocial: data.razonSocial,
    };

    return await this.CompanyModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async desactivarEmpresa(id) {
    return await this.CompanyModel.findByIdAndUpdate(
      id,
      { estatus: "inactiva" },
      { new: true, runValidators: true }
    );
  }

  async activarEmpresa(id) {
    console.log("Activando empresa con ID:", id);

    const result = await this.CompanyModel.findByIdAndUpdate(
      id,
      { estatus: "activa" },
      { new: true, runValidators: true }
    );

    console.log("Resultado:", result);
    return result;
  }
  async existingCompany(data) {
    return await this.CompanyModel.findOne({
      $or: [{ name: data.name }, { databaseName: data.databaseName }],
      status: "active",
    });
  }
}

module.exports = CompanyRepository;
