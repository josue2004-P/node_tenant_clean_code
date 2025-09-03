const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ApiError } = require("../../../utils/ApiError");
const UserSchema = require("../../../infrastructure/mongo/schemas/UserSchema");

module.exports = (companyRepository) => {
  return async (companyData, lang, t) => {
    const existing = await companyRepository.existingCompany(companyData);
    if (existing) {
      throw new ApiError(t("companyExists", lang), "COMPANY_EXISTS", 409);
    }

    const createdCompany = await companyRepository.create(companyData);

    return createdCompany;
  };
};
