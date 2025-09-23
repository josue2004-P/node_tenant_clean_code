const { ApiError } = require("../../../utils/ApiError");

module.exports = (permissionRepository) => {
  return async (lang,t) => {
    const permissions = await permissionRepository.getAll();

    if (!permissions || permissions.length === 0) {
      return t("noUserFond", lang)
    }
    return permissions;
  };
};
