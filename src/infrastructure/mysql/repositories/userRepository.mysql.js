class UserRepositoryMysql {
  constructor(pool) {
    this.pool = pool;
  }

  async create(user) {
    const [result] = await this.pool.execute(
      `INSERT INTO users (
      first_name, 
      last_name, 
      middle_name, 
      username, 
      email, 
      password,       -- nuevo campo
      avatar, 
      is_inactive, 
      created_at
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        user.firstName ?? null,
        user.lastName ?? null,
        user.middleName ?? null,
        user.username ?? null,
        user.email ?? null,
        user.password ?? null, // nuevo valor
        user.avatar ?? null,
        user.isInactive !== undefined ? (user.isInactive ? 1 : 0) : 0,
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
  async findByEmail(email) {
    const [rows] = await this.pool.execute(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  }
  async findByUsername(username) {
    const [rows] = await this.pool.execute(
      `SELECT * FROM users WHERE username = ? LIMIT 1`,
      [username]
    );
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = UserRepositoryMysql;
