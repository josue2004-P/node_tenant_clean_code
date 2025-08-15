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

const getAll = async (req, res, next) => {
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

const getById = async (req, res, next) => {
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
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorFetchingCompany", defaultLang),
        "ERROR_FETCHING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const update = async (req, res,next) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const updateCompany = UpdateCompany(companyRepository);
    const company = await updateCompany(req.params.id, req.body,defaultLang,t);

    await redisClient.del("companies:all");

    res.status(200).json({
      message: t("companyUpdated", defaultLang),
      data: company,
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorUpdatingCompany", defaultLang),
        "ERROR_UPDATING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const activateCompany = async (req, res,next) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const activateUseCase = ActivateCompany(companyRepository);
    await activateUseCase(req.params.id,defaultLang,t);

    await redisClient.del("companies:all");

    res.status(200).json({
      message: t("companyActivated", defaultLang),
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorActivatingCompany", defaultLang),
        "ERROR_ACTIVATING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const deactivateCompany = async (req, res,next) => {
  try {
    const companyModel = req.Company;
    const companyRepository = new CompanyRepository(companyModel);

    const deactivateUseCase = DeactivateCompany(companyRepository);
    await deactivateUseCase(req.params.id,defaultLang,t);

    await redisClient.del("companies:all");

    res.status(200).json({ 
      message: t("companyDeactivated", defaultLang),
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorDeactivatingCompany", defaultLang),
        "ERROR_DEACTIVATING_COMPANY",
        401
      );
    }
    next(error);
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
