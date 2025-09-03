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
}

module.exports = UserRepositoryMongo;
