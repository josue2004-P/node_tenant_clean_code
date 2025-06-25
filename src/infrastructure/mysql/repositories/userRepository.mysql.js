class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async create(user) {
    const [result] = await this.pool.execute(
      `INSERT INTO users (first_name, last_name, middle_name, username, email, avatar, is_inactive, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        user.firstName,
        user.lastName,
        user.middleName,
        user.username,
        user.email,
        user.avatar,
        user.isInactive ? 1 : 0,
      ]
    );

    return {
      id: result.insertId,
      ...user,
      createdAt: new Date(),
    };
  }

  async getAll() {
    const [rows] = await this.pool.execute(`SELECT * FROM users`);
    return rows;
  }
}

module.exports = UserRepository;
