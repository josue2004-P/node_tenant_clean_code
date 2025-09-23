const { ApiError } = require("../../../utils/ApiError");

module.exports = (permissionRepository) => {
  return async (permissionData, lang, t) => {
  
    const existingName = await permissionRepository.findByName(permissionData.name);
    if (existingName) {
      throw new ApiError(t("companyExists", lang), "COMPANY_EXISTS", 409);
    }

    const createdPermission = await permissionRepository.create(permissionData);

    return createdPermission;
  };
};
