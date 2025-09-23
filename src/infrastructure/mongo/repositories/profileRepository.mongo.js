class ProfileRepositoryMongo {
  constructor(ProfileModel) {
    this.Profile = ProfileModel;
  }

  // Get all users
  async getAll() {
    return await this.Profile.find({});
  }

  // Create a new user
  async create(data) {
    const permission = new this.Profile(data);
    return await permission.save();
  }

    // Find a user by name
  async findByName(name) {
    return await this.Profile.findOne({ name });
  }
}

module.exports = ProfileRepositoryMongo;
