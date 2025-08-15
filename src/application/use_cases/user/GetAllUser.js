const { ApiError } = require("../../../utils/ApiError");

module.exports = (userRepository) => {
  return async (lang,t) => {
    const users = await userRepository.getAll();

    if (!users || users.length === 0) {
      return t("noUserFond", lang)
    }
    return users;
  };
};
