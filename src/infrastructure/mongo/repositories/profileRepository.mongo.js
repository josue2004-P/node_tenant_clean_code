class ProfileRepositoryMongo {
  constructor(ProfileModel) {
    this.Profile = ProfileModel;
  }

  // Get all users
  async getAll() {
    const profiles = await this.Profile.find({}).populate(
      "permissions.permission_id",
      "name"
    );

    // transformar el resultado
    return profiles.map((profile) => ({
      ...profile.toObject(),
      permissions: profile.permissions.map((p) => ({
        name: p.permission_id?.name || null, // 👈 solo el nombre
        view: p.view,
        create: p.create,
        edit: p.edit,
        delete: p.delete,
      })),
    }));
  }

  // Create a new user
  async create(data) {
    const permission = new this.Profile(data);
    return await permission.save();
  }

  async getById(id) {
    return await this.Profile.findById(id);
  }

  // Find a user by name
  async findByName(name) {
    return await this.Profile.findOne({ name });
  }

  async update(id, data) {
    return await this.Profile.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          description: data.description,
          permissions: data.permissions, // reemplaza todo el array
          updated_at: new Date(),
        },
      },
      { new: true, runValidators: true } // new -> devuelve actualizado, runValidators -> valida schema
    );
  }

  async delete(id) {
    return await this.Profile.findByIdAndDelete(id);
  }
}

module.exports = ProfileRepositoryMongo;
