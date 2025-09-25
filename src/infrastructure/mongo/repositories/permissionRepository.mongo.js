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

  async getById(id) {
    return await this.Permission.findById(id);
  }

  async update(id, data) {
    return await this.Permission.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          description: data.description,
          updated_at: new Date(),
        },
      },
      { new: true, runValidators: true } // new -> devuelve actualizado, runValidators -> valida schema
    );
  }

  async delete(id) {
    return await this.Permission.findByIdAndDelete(id);
  }
}

module.exports = PermissionRepositoryMongo;
