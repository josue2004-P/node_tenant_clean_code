const { ApiError } = require("../../../utils/ApiError");

const bcrypt = require('bcryptjs');

module.exports = (userRepository) => {
  return async (userData) => {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    // Verificar si ya existe un usuario con el mismo email
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    // Puedes agregar también verificación por username si quieres
    if (userRepository.findByUsername) {
      const existingUsername = await userRepository.findByUsername(userData.username);
      if (existingUsername) {
        throw new Error('A user with this username already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userToSave = {
      ...userData,
      password: hashedPassword,
    };

    return await userRepository.create(userToSave);
  };
};
