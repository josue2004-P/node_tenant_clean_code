class CompanyRepository {
  constructor(CompanyModel) {
    this.CompanyModel = CompanyModel;
  }

  async create(data) {
    const company = new this.CompanyModel(data);
    return await company.save();
  }

  async getAll() {
    return await this.CompanyModel.find({ status: "active" });
  }

  async getById(id) {
    return await this.CompanyModel.findById(id);
  }

  async update(id, data) {
    const updateData = {
      legalName: data.legalName,
    };

    return await this.CompanyModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async activateCompany(id) {
    return await this.CompanyModel.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true, runValidators: true }
    );
  }
  
  async deactivateCompany(id) {
    return await this.CompanyModel.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true, runValidators: true }
    );
  }

  async existingCompany(data) {
    return await this.CompanyModel.findOne({
      $or: [{ name: data.name }, { databaseName: data.databaseName }],
      status: "active",
    });
  }
}

module.exports = CompanyRepository;
