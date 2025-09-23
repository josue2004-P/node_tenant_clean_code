const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");
module.exports = (userRepository) => {
  return async (id, lang, t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError(t("noCompanyFound", lang), "NO_COMPANY_FOUND", 404);
    }

    if (user.isInactive === true) {
      throw new ApiError(
        t("companyAlreadyInactive", lang),
        "COMPANY_ALREADY_INACTIVE",
        409
      );
    }

    const deactivateUser = await userRepository.deactivateUser(id);

    return deactivateUser;
  };
};
