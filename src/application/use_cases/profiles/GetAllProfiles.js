const { ApiError } = require("../../../utils/ApiError");

module.exports = (profilesRepository) => {
  return async (lang,t) => {
    const profiles = await profilesRepository.getAll();

    if (!profiles || profiles.length === 0) {
      return t("noProfilesFond", lang)
    }
    return profiles;
  };
};
