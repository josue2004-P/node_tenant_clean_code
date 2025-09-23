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

  async update(id, data) {
 
    const profile = await this.Profile.findById(id);

    // Validar que los permisos del body existen
    let validPermissions = [];
    if (data.permissions && Array.isArray(data.permissions)) {
      const permissionsExist = await Permission.find({
        _id: { $in: data.permissions },
      });
      validPermissions = permissionsExist.map((p) => p._id.toString());
    }

    // Array sincronizado
    const updatedPermissions = [];

    // Mantener los permisos existentes que siguen en el body
    profile.permissions.forEach((p) => {
      if (validPermissions.includes(p.permission_id.toString())) {
        updatedPermissions.push(p);
      }
    });

    // Agregar los nuevos permisos que están en el body pero no en profile
    validPermissions.forEach((pId) => {
      if (
        !profile.permissions
          .map((p) => p.permission_id.toString())
          .includes(pId)
      ) {
        updatedPermissions.push({
          permission_id: pId,
          view: false,
          create: false,
          edit: false,
          delete: false,
        });
      }
    });

    // Asignar y guardar
    profile.permissions = updatedPermissions;

    console.log(profile)
    return
    await profile.save();

    return profile;
  }
}

module.exports = ProfileRepositoryMongo;
