const { ApiError } = require("../../../utils/ApiError");

module.exports = (profileRepository) => {
  return async (profileData, lang, t) => {
  
    const existingName = await profileRepository.findByName(profileData.name);
    if (existingName) {
      throw new ApiError(t("companyExists", lang), "COMPANY_EXISTS", 409);
    }

    const createdProfile = await profileRepository.create(profileData);

    return createdProfile;
  };
};
