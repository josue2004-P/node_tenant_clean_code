const mongoose = require("mongoose");
const UserSchema = require("../../../infrastructure/mongo/schemas/UserSchema");

class UserRepositoryMongo {
  constructor(UserModel) {
    this.User = UserModel;
  }

  // Get all users
  async getAll() {
    return await this.User.find({});
  }

  // Create a new user
  async create(data) {
    const user = new this.User(data);
    return await user.save();
  }

  // Create a new user default
  async createUserDefault(dbName, data) {
    const uri = process.env.MONGO_URI.replace("/?", `/${dbName}?`);

    const tenantConn = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const User = tenantConn.model("User", UserSchema);

    const defaultUser = new User(data);

    return await defaultUser.save();
  }

  // Find a user by email
  async findByEmail(email) {
    return await this.User.findOne({ email });
  }

  // Find a user by username
  async findByUsername(username) {
    return await this.User.findOne({ username });
  }

  async getById(id) {
    return await this.User.findById(id);
  }

  async update(id, data) {
    let profiles = [];

    if (data.profiles) {
      try {
        const parsed = JSON.parse(data.profiles);

        // Caso: [ "id1", "id2" ]
        if (Array.isArray(parsed)) {
          profiles = parsed;
        }
        // Caso: { profiles: [ "id1", "id2" ] }
        else if (parsed.profiles && Array.isArray(parsed.profiles)) {
          profiles = parsed.profiles;
        } else {
          throw new Error("Formato de profiles no soportado");
        }
      } catch (err) {
        throw new Error("JSON inválido en profiles");
      }
    }

    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      profiles: profiles,
    };

    // Solo agrega password si existe en data
    if (data.password) {
      updateData.password = data.password;
    }

    return await this.User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("profiles","name");
  }

  async activateUser(id) {
    return await this.User.findByIdAndUpdate(
      id,
      { isInactive: true },
      { new: true, runValidators: true }
    );
  }

  async deactivateUser(id) {
    return await this.User.findByIdAndUpdate(
      id,
      { isInactive: true },

      { new: true, runValidators: true }
    );
  }
}

module.exports = UserRepositoryMongo;
