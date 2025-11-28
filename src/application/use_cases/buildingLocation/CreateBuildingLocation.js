const { ApiError } = require("../../../utils/ApiError");

module.exports = (buldingLocationRepository) => {
  return async (buildingLocationData, lang, t) => {
  
    // const existingName = await profileRepository.findByName(profileData.name);

    // if (existingName) {
    //   throw new ApiError(t("nameProfileExists", lang), "PROFILE_EXISTS", 409);
    // }

    const createdBuildingLocation = await buldingLocationRepository.create(buildingLocationData);

    return createdBuildingLocation;
  };
};
