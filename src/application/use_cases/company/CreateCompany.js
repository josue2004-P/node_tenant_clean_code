const { ApiError } = require("../../../utils/ApiError");

module.exports = (companyRepository) => {
  return async (companyData, lang, t) => {
    const companies = await companyRepository.existingCompany(companyData);
    
    if (companies) {
      throw new ApiError(t("companyExists", lang), "COMPANY_EXISTS", 409);
    }

    return await companyRepository.create(companyData);
  };
};
