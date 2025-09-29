const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (userRepository) => {
  return async (id, lang, t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError(t("noUserFond", lang), "NO_USER_FOUND", 404);
    }

    return user;
  };
};
