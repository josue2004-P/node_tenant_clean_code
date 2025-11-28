class EquipmentIssueRepositoryMongo {
  constructor(EquipmentIssueModel) {
    this.EquipmentIssue = EquipmentIssueModel;
  }

  async create(data) {
    const equipmentIssue = new this.EquipmentIssue(data);
    return await equipmentIssue.save();
  }

  async getAll() {
    return await this.EquipmentIssue.find();
  }

  async getById(id) {
    return await this.EquipmentIssue.findById(id);
  }

  async update(id, data) {

    const updateData = {
    };

    return await this.EquipmentIssue.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await this.EquipmentIssue.findByIdAndDelete(id);
  }
}

module.exports = EquipmentIssueRepositoryMongo;
