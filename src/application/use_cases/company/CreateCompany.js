module.exports = (companyRepository) => {
  return async (companyData,lang,t) => {

    const companies = await companyRepository.existingCompany(companyData);
    if (companies) {
      throw new Error(t('companyExists', lang));
    }

    return await companyRepository.create(companyData);
  };
};
