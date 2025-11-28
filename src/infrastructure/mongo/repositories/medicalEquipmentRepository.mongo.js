class MedicalEquipmentRepositoryMongo {
  constructor(MedicalEquipmentModel) {
    this.MedicalEquipment = MedicalEquipmentModel;
  }

  async create(data) {
    const medicalEquipment = new this.MedicalEquipment(data);
    return await medicalEquipment.save();
  }

  async getAll() {
    return await this.MedicalEquipment.find();
  }

  async getById(id) {
    return await this.MedicalEquipment.findById(id);
  }

  async update(id, data) {

    const updateData = {
    };

    return await this.MedicalEquipment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await this.MedicalEquipment.findByIdAndDelete(id);
  }
}

module.exports = MedicalEquipmentRepositoryMongo;
