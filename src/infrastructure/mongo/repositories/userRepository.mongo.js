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
