const { ApiError } = require("../../../utils/ApiError");

module.exports = (userRepository) => {
  return async () => {
    const users = await userRepository.getAll();

    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    return users;
  };
};
