const bcrypt = require('bcryptjs');

module.exports = (userRepository) => {
  return async (userData) => {
    
    if (!userData.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const userToSave = {
      ...userData,
      password: hashedPassword,
    };

    return await userRepository.create(userToSave);
  };
};
