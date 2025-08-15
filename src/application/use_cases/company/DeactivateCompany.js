const { ApiError } = require("../../../utils/ApiError");

const mongoose = require("mongoose");
module.exports = (companyRepository) => {
  return async (id,lang,t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    const company = await companyRepository.getById(id);

    if (!company) {
      throw new ApiError(t("noCompanyFound", lang), "NO_COMPANY_FOUND", 404);
    }

    if (company.status === "inactive") {
      throw new ApiError(t("companyAlreadyInactive", lang), "COMPANY_ALREADY_INACTIVE", 409);
    }

    const deactivateCompany = await companyRepository.deactivateCompany(id);

    return deactivateCompany;
  };
};


