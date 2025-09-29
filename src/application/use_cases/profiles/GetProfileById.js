const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (profilesRepository) => {
  return async (id, lang, t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const profile = await profilesRepository.getById(id);

    if (!profile) {
      throw new ApiError(t("noProfileFond", lang), "NO_PROFILE_FOUND", 404);
    }

    return profile;
  };
};
