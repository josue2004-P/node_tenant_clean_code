module.exports = (userRepository) => {
  return async () => {
    return await userRepository.getAll();
  };
};
