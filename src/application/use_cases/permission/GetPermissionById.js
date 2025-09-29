const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (permissionRepository) => {
  return async (id, lang, t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const permission = await permissionRepository.getById(id);

    if (!permission) {
      throw new ApiError(t("noPermissionFond", lang), "NO_PERMISSION_FOUND", 404);
    }

    return permission;
  };
};
