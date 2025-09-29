const PermissionRepositoryMongo = require("../../../infrastructure/mongo/repositories/permissionRepository.mongo");

const CreatePermission = require("../../../application/use_cases/permission/CreatePermission");
const GetAllPermissions = require("../../../application/use_cases/permission/GetAllPermissions");
const GetPermissionById = require("../../../application/use_cases/permission/GetPermissionById");
const UpdatePermission = require("../../../application/use_cases/permission/UpdatePermission");
const DeletePermission = require("../../../application/use_cases/permission/DeletePermission");

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
      message: t("permissionCreated", lang),
      permission,
    });
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("errorCreatingPermission", lang),
        "CREATE_PERMISSION_FAILED",
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
      message: t("permissionRetrieved", lang),
      permissions,
    });
  } catch (err) {
    console.log(err);
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("errorFetchingPermissions", lang),
        "ERROR_FETCHING_PERMISSIONS",
        401
      );
    }
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const permissionModel = req.Permission;
    const permissionRepository = new PermissionRepositoryMongo(permissionModel);

    const getPermissionById = GetPermissionById(permissionRepository);
    const permission = await getPermissionById(req.params.id, lang, t);

    res.status(200).json({
      message: t("permissionRetrieved", lang),
      data: permission,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorFetchingPermission", lang),
        "ERROR_FETCHING_PERMISSION",
        401
      );
    }
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const permissionModel = req.Permission;
    const permissionRepository = new PermissionRepositoryMongo(permissionModel);

    const updatePermission = UpdatePermission(permissionRepository);
    const permission = await updatePermission(req.params.id, req.body, lang, t);

    res.status(200).json({
      message: t("permissionUpdated", lang),
      data: permission,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorUpdatingPermission", lang),
        "ERROR_UPDATING_PERMISSION",
        401
      );
    }
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const permissionModel = req.Permission;
    const permissionRepository = new PermissionRepositoryMongo(permissionModel);

    const deletePermission = DeletePermission(permissionRepository);
    const permission = await deletePermission(req.params.id, req.body, lang, t);

    res.status(200).json({
      message: t("permissionDeleted", lang),
      data: permission,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("errorDeletingPermission", lang),
        "ERROR_UPDATING_PEMRISSION",
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
  deleted,
};
