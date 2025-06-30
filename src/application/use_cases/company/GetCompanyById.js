const mongoose = require('mongoose');

module.exports = (companyRepository) => {
  return async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ObjectId");
      error.code = 400;
      throw error;
    }

    const company = await companyRepository.getById(id);

    if (!company) {
      const error = new Error("Company not found");
      error.code = 404;
      throw error;
    }

    return company;
  };
};
