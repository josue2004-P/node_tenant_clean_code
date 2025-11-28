const { ApiError } = require("../../../utils/ApiError");

module.exports = (buldingLocationRepository) => {
  return async (lang,t) => {
    const buildingLocations = await buldingLocationRepository.getAll();

    if (!buildingLocations || buildingLocations.length === 0) {
      return t("", lang)
    }
    return buildingLocations;
  };
};
