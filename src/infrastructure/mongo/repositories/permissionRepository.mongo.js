class PermissionRepositoryMongo {
  constructor(PermissionModel) {
    this.Permission = PermissionModel;
  }

  // Get all users
  async getAll() {
    return await this.Permission.find({});
  }

  // Create a new user
  async create(data) {
    const permission = new this.Permission(data);
    return await permission.save();
  }

    // Find a user by name
  async findByName(name) {
    return await this.Permission.findOne({ name });
  }
}

module.exports = PermissionRepositoryMongo;
