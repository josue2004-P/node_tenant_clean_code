const CompanyRepository = require("../../../infrastructure/mongo/repositories/companyRepository.mongo");

const CreateCompany = require("../../../application/use_cases/company/CreateCompany");
const GetAllCompanies = require("../../../application/use_cases/company/GetAllCompany");
const GetCompanyById = require("../../../application/use_cases/company/GetCompanyById");
const UpdateCompany = require("../../../application/use_cases/company/UpdateCompany");
const ActivateCompany = require("../../../application/use_cases/company/ActivateCompany");
const DeactivateCompany = require("../../../application/use_cases/company/DeactivateCompany");

const { t } = require("../../../utils/translator");
const defaultLang = require("../../../config/lang");

const redisClient = require("../../../config/redisClient");

const create = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const createCompany = CreateCompany(companyRepository);
    const company = await createCompany(req.body, defaultLang, t);

    await redisClient.del("companies:all");

    res.status(201).json({
      message: t("companyCreated", defaultLang),
      data: company,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message || t("errorCreatingCompany", defaultLang),
    });
  }
};

const getAll = async (req, res) => {
  try {
    if (!req.Company) {
      return res
        .status(403)
        .json({ message: "Company model is missing. Operation not allowed" });
    }

    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const getAllCompanies = GetAllCompanies(companyRepository);
    const companies = await getAllCompanies(defaultLang, t);

    res.status(200).json({
      message: t("companiesRetrieved", defaultLang),
      data: companies,
    });
  } catch (error) {
    console.error(error);
    const message =
      error.message === "No companies found"
        ? t("noCompaniesFound", defaultLang)
        : error.message || t("errorFetchingCompanies", defaultLang);
    res.status(404).json({ message });
  }
};

const getById = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const getCompanyById = GetCompanyById(companyRepository);
    const company = await getCompanyById(req.params.id, defaultLang, t);

    res.status(200).json({
      message: t("companiesRetrieved", defaultLang),
      data: company,
    });
  } catch (error) {
    const status = error.code || 400;
    let messageKey;

    if (error.message === "Invalid ObjectId") {
      messageKey = "invalidObjectId";
    } else if (error.message === "Company not found") {
      messageKey = "noCompanyFound";
    } else {
      messageKey = "errorFetchingCompany";
    }

    res.status(status).json({ message: t(messageKey, defaultLang) });
  }
};

const update = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const updateCompany = UpdateCompany(companyRepository);
    const company = await updateCompany(req.params.id, req.body);

    await redisClient.del("companies:all");

    res.status(200).json({
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    const status = error.code || 400;
    let messageKey;

    if (error.message === "Invalid ObjectId") {
      messageKey = "invalidObjectId";
    } else if (error.message === "Company not found") {
      messageKey = "noCompanyFound";
    } else {
      messageKey = "errorFetchingCompany";
    }

    res.status(status).json({ message: t(messageKey, defaultLang) });
  }
};

const activateCompany = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const activateUseCase = ActivateCompany(companyRepository);
    const success = await activateUseCase(req.params.id);

    if (!success) {
      return res
        .status(404)
        .json({ message: "Company not found for activation" });
    }

    await redisClient.del("companies:all");

    res.status(200).json({ message: "Company successfully activated" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error activating company" });
  }
};

const deactivateCompany = async (req, res) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const deactivateUseCase = DeactivateCompany(companyRepository);
    const success = await deactivateUseCase(req.params.id);

    if (!success) {
      return res
        .status(404)
        .json({ message: "Company not found for deactivation" });
    }

    await redisClient.del("companies:all");

    res.status(200).json({ message: "Company successfully deactivated" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error deactivating company" });
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
