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

    if (user.isInactive === false) {
      throw new ApiError(
        t("userAlreadyActive", lang),
        "USER_ALREADY_ACTIVE",
        409
      );
    }

    const activateUser = await userRepository.activateUser(id);

    return activateUser;
  };
};
