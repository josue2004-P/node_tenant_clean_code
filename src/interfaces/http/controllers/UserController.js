const UserRepositoryMongo = require("../../../infrastructure/mongo/repositories/userRepository.mongo");

const CreateUser = require("../../../application/use_cases/user/CreateUser");
const GetAllUsers = require("../../../application/use_cases/user/GetAllUser");
const GetUserById = require("../../../application/use_cases/user/GetUserById");
const UpdateUser = require("../../../application/use_cases/user/UpdateUser");
const ActivateUser = require("../../../application/use_cases/user/ActivateUser");
const DeactivateUser = require("../../../application/use_cases/user/DeactivateUser");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const lang = require("../../../config/lang");

const create = async (req, res, next) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepositoryMongo(userModel);

    const createUser = CreateUser(userRepository);
    const user = await createUser(req.body, lang, t);

    res.status(200).json({
      message: t("userCreated", lang),
      user,
    });
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("errorCreatingUser", lang),
        "CREATE_USER_FAILED",
        401
      );
    }
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepositoryMongo(userModel);

    const getAllUsers = GetAllUsers(userRepository);
    const users = await getAllUsers(lang, t);

    res.status(200).json({
      message: t("usersRetrieved", lang),
      users,
    });
  } catch (err) {

    console.log(err)
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("errorFetchingUsers", lang),
        "ERROR_FETCHING_USERS",
        401
      );
    }
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepositoryMongo(userModel);

    const getUserById = GetUserById(userRepository);
    const user = await getUserById(req.params.id, lang, t);

    res.status(200).json({
      message: t("companiesRetrieved", lang),
      data: user,
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorFetchingCompany", lang),
        "ERROR_FETCHING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepositoryMongo(userModel);

    const updateUser = UpdateUser(userRepository);
    const user = await updateUser(
      req.params.id,
      req.body,
      lang,
      t
    );
    // await redisClient.del("companies:all");

    res.status(200).json({
      message: t("companyUpdated", lang),
      data: user,
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorUpdatingCompany", lang),
        "ERROR_UPDATING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const activateUser = async (req, res, next) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepositoryMongo(userModel);

    const activateUseCase = ActivateUser(userRepository);
    await activateUseCase(req.params.id, lang, t);

    // await redisClient.del("companies:all");

    res.status(200).json({
      message: t("companyActivated", lang),
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorActivatingCompany", lang),
        "ERROR_ACTIVATING_COMPANY",
        401
      );
    }
    next(error);
  }
};

const deactivateUser = async (req, res, next) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepositoryMongo(userModel);

    const deactivateUseCase = DeactivateUser(userRepository);
    await deactivateUseCase(req.params.id, lang, t);

    // await redisClient.del("companies:all");

    res.status(200).json({
      message: t("companyDeactivated", lang),
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorDeactivatingCompany", lang),
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
  activateUser,
  deactivateUser
};
