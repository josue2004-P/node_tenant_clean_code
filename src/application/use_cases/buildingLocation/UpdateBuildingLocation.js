const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (buldingLocationRepository) => {
  return async (id, data,lang,t) => {
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const buildingLocation = await buldingLocationRepository.update(id, data);

    if (!buildingLocation) {
      throw new ApiError(t("", lang), "", 404);
    }

    return buildingLocation;
  };
};
