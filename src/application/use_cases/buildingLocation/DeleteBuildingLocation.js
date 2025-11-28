const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (buldingLocationRepository) => {
  return async (id,lang,t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const buildingLocation = await buldingLocationRepository.delete(id);

    if (!buildingLocation) {
      throw new ApiError(t("", lang), "", 404);
    }

    return buildingLocation;
  };
};
