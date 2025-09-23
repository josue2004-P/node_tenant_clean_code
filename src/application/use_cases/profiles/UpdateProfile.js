const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (profileRepository) => {
  return async (id, data,lang,t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const profile = await profileRepository.update(id, data);

    if (!profile) {
      throw new ApiError(t("noCompanyFound", lang), "NO_COMPANY_FOUND", 404);
    }

    return profile;
  };
};
