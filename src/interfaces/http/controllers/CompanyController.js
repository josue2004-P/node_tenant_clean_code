const CompanyRepository = require("../../../infrastructure/mongo/repositories/companyRepository.mongo");

const CreateCompany = require("../../../application/use_cases/company/CreateCompany");
const GetAllCompanies = require("../../../application/use_cases/company/GetAllCompany");
const GetCompanyById = require("../../../application/use_cases/company/GetCompanyById");
const UpdateCompany = require("../../../application/use_cases/company/UpdateCompany");
const ActivateCompany = require("../../../application/use_cases/company/ActivateCompany");
const DeactivateCompany = require("../../../application/use_cases/company/DeactivateCompany");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const defaultLang = require("../../../config/lang");

const redisClient = require("../../../config/redisClient");

const create = async (req, res, next) => {
  try {
    const companyRepository = new CompanyRepository(req.Company);
    const createCompany = CreateCompany(companyRepository);
    const company = await createCompany(req.body, defaultLang, t);

    await redisClient.del("companies:all");

    res.status(201).json({
      message: t("companyCreated", defaultLang),
      data: company,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorCreatingCompany", defaultLang),
        "ERROR_CREATING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const getAll = async (req, res,next) => {
  try {

    if (!req.Company) {
      throw new ApiError(
        t("companyModelMissing", defaultLang),
        "COMPANY_MODEL_MISSING",
        401
      );
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
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorFetchingCompanies", defaultLang),
        "ERROR_FETCHING_COMPANIES",
        401
      );
    }
    next(error);
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
    await activateUseCase(req.params.id);

    await redisClient.del("companies:all");

    res.status(200).json({
      message: t("companyActivated", defaultLang),
    });
  } catch (error) {
    // 1) status por defecto
    const status = error.code ?? 500;
    let messageKey;
    switch (error.message) {
      case "Invalid ObjectId":
        messageKey = "invalidObjectId";
        break;
      case "Company not found":
        messageKey = "noCompanyFound";
        break;
      case "Company is already active":
        messageKey = "companyAlreadyActive";
        break;
      default:
        messageKey = "errorActivatingCompany";
    }

    return res.status(status).json({
      message: t(messageKey, defaultLang),
    });
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
