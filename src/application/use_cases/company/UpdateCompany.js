const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");

module.exports = (companyRepository) => {
  return async (id, data,lang,t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const company = await companyRepository.update(id, data);

    if (!company) {
      throw new ApiError(t("noCompanyFound", lang), "NO_COMPANY_FOUND", 404);
    }

    return company;
  };
};
