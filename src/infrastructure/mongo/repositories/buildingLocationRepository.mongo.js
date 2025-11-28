class BuildingLocationRepositoryMongo {
  constructor(BuildingLocationModel) {
    this.BuildingLocation = BuildingLocationModel;
  }

  async create(data) {
    const buildingLocation = new this.BuildingLocation(data);
    return await buildingLocation.save();
  }

  async getAll() {
    return await this.BuildingLocation.find();
  }

  async getById(id) {
    return await this.BuildingLocation.findById(id);
  }

  async update(id, data) {

    const updateData = {
    };

    return await this.BuildingLocation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await this.BuildingLocation.findByIdAndDelete(id);
  }
}

module.exports = BuildingLocationRepositoryMongo;
