const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (permissionRepository) => {
  return async (id, lang, t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const permission = await permissionRepository.getById(id);

    if (!permission) {
      throw new ApiError(t("", lang), "", 404);
    }

    return permission;
  };
};
