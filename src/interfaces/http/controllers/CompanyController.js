const CompanyRepository = require("../../../infrastructure/mongo/repositories/companyRepository.mongo");

const CreateCompany = require("../../../application/use_cases/company/CreateCompany");
const GetAllCompanies = require("../../../application/use_cases/company/GetAllCompany");
const GetCompanyById = require("../../../application/use_cases/company/GetCompanyById");
const UpdateCompany = require("../../../application/use_cases/company/UpdateCompany");
const ActivateCompany = require("../../../application/use_cases/company/ActivateCompany");
const DeactivateCompany = require("../../../application/use_cases/company/DeactivateCompany");

const redisClient = require('../../../config/redisClient');

const create = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const createCompany = CreateCompany(companyRepository);
    const company = await createCompany(req.body);

    await redisClient.del("companies:all");

    res.status(201).json({
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error creating company" });
  }
};

const getAll = async (req, res) => {
  try {

    if (!req.Company) {
      return res.status(403).json({ message: 'Company model is missing. Operation not allowed' });
    }

    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const getAllCompanies = GetAllCompanies(companyRepository);
    const companies = await getAllCompanies();

    res.status(200).json({
      message: "Companies retrieved successfully",
      data: companies,
    });
  } catch (error) {
    console.error(error);
    const message = error.message === "No companies found"
      ? "No companies found"
      : error.message || "Error fetching companies";
    res.status(404).json({ message });
  }
};

const getById = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const getCompanyById = GetCompanyById(companyRepository);
    const company = await getCompanyById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company retrieved successfully",
      data: company,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error fetching company" });
  }
};

const update = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const updateCompany = UpdateCompany(companyRepository);
    const company = await updateCompany(req.params.id, req.body);

    if (!company) {
      return res.status(404).json({ message: "Company not found for update" });
    }

    await redisClient.del("companies:all");

    res.status(200).json({
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error updating company" });
  }
};

const activateCompany = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const activateUseCase = ActivateCompany(companyRepository);
    const success = await activateUseCase(req.params.id);

    if (!success) {
      return res.status(404).json({ message: "Company not found for activation" });
    }

    await redisClient.del("companies:all");

    res.status(200).json({ message: "Company successfully activated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error activating company" });
  }
};

const deactivateCompany = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const deactivateUseCase = DeactivateCompany(companyRepository);
    const success = await deactivateUseCase(req.params.id);

    if (!success) {
      return res.status(404).json({ message: "Company not found for deactivation" });
    }

    await redisClient.del("companies:all");

    res.status(200).json({ message: "Company successfully deactivated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error deactivating company" });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  activateCompany,
  deactivateCompany,
};
