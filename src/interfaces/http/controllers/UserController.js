const UserRepositoryMongo = require("../../../infrastructure/mongo/repositories/userRepository.mongo");

const CreateUser = require("../../../application/use_cases/user/CreateUser");
const GetAllUsers = require("../../../application/use_cases/user/GetAllUser");

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

module.exports = {
  create,
  getAll,
};
