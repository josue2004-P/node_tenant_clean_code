const GetAllCompanies = require("../../../application/use_cases/company/GetAllCompany");
const CompanyRepository = require("../../../infrastructure/mongo/repositories/companyRepository.mongo");

const resolvers = {
  Query: {
    companies: async (parent, args, context) => {
      // You can access context.req.Company here
      const companyModel = context.req.Company;
      const companyRepository = new CompanyRepository(companyModel);

      const getAllCompanies = GetAllCompanies(companyRepository);
      return await getAllCompanies();
    },
  },
  Company: {
    id: (parent) => parent._id.toString(),
  },
};

module.exports = { resolvers };
