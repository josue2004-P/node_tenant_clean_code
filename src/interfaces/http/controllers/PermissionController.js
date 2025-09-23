const PermissionRepositoryMongo = require("../../../infrastructure/mongo/repositories/permissionRepository.mongo");

const CreatePermission = require("../../../application/use_cases/permission/CreatePermission");
const GetAllPermissions = require("../../../application/use_cases/permission/GetAllPermissions");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const lang = require("../../../config/lang");

const create = async (req, res, next) => {
  try {
    const permissionModel = req.Permission;
    const permissionRepository = new PermissionRepositoryMongo(permissionModel);

    const createPermission = CreatePermission(permissionRepository);
    const permission = await createPermission(req.body, lang, t);

    res.status(200).json({
      message: t("userCreated", lang),
      permission,
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
    const permissionModel = req.Permission;
    const permissionRepository = new PermissionRepositoryMongo(permissionModel);

    const getAllPermissions = GetAllPermissions(permissionRepository);
    const permissions = await getAllPermissions(lang, t);

    res.status(200).json({
      message: t("usersRetrieved", lang),
      permissions,
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
