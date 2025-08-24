const CreateCompany = require("../use_cases/company/CreateCompany");
const CreateDefaultUser = require("../use_cases/user/CreateDefaultUser");
const CompanyRepository = require("../../infrastructure/mongo/repositories/companyRepository.mongo");
const UserRepository = require("../../infrastructure/mongo/repositories/userRepository.mongo");


class CompanyService {
  constructor(CompanyModel, UserModel) {
    this.companyRepository = new CompanyRepository(CompanyModel);
    this.userRepository = new UserRepository(UserModel);
  }

  async createCompanyWithDefaultUser(companyData, lang, t) {
    // 1️⃣ Crear compañía
    const createCompany = CreateCompany(this.companyRepository);
    const company = await createCompany(companyData, lang, t);

    // 2️⃣ Crear usuario predeterminado en la base recién creada
    const createDefaultUser = CreateDefaultUser(this.userRepository);
    await createDefaultUser(company.databaseName,lang, t);

    return company;
  }
}
module.exports = CompanyService;
