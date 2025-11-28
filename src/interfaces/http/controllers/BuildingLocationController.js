const BuildingLocationRepositoryMongo = require("../../../infrastructure/mongo/repositories/buildingLocationRepository.mongo");

const CreateBuildingLocation = require("../../../application/use_cases/buildingLocation/CreateBuildingLocation");
const GetAllBuildingLocation = require("../../../application/use_cases/buildingLocation/GetAllBuildingLocation");
const GetBuildingLocationById = require("../../../application/use_cases/buildingLocation/GetBuildingLocationById");
const UpdateBuildingLocation = require("../../../application/use_cases/buildingLocation/UpdateBuildingLocation");
const DeleteBuildingLocation = require("../../../application/use_cases/buildingLocation/DeleteBuildingLocation");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const lang = require("../../../config/lang");

const create = async (req, res, next) => {
  try {
    const buildingLocationModel = req.BuildingLocation;
    const buildingLocationRepository = new BuildingLocationRepositoryMongo(
      buildingLocationModel
    );

    const createBuildingLocation = CreateBuildingLocation(
      buildingLocationRepository
    );
    const buildingLocations = await createBuildingLocation(req.body, lang, t);

    res.status(200).json({
      message: t("Chido", lang),
      buildingLocations,
    });
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(t("", lang), "", 401);
    }
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const buildingLocationModel = req.BuildingLocation;
    const buildingLocationRepository = new BuildingLocationRepositoryMongo(
      buildingLocationModel
    );

    const getAllBuildingLocation = GetAllBuildingLocation(
      buildingLocationRepository
    );
    const buildingLocations = await getAllBuildingLocation(lang, t);

    res.status(200).json({
      message: t("", lang),
      buildingLocations,
    });
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(t("", lang), "", 401);
    }
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const buildingLocationModel = req.BuildingLocation;
    const buildingLocationRepository = new BuildingLocationRepositoryMongo(
      buildingLocationModel
    );

    const getAllBuildingLocationById = GetBuildingLocationById(
      buildingLocationRepository
    );
    const buildingLocation = await getAllBuildingLocationById(req.params.id,lang, t);

    res.status(200).json({
      message: t("", lang),
      data: buildingLocation,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(t("", lang), "", 401);
    }
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const buildingLocationModel = req.BuildingLocation;
    const buildingLocationRepository = new BuildingLocationRepositoryMongo(
      buildingLocationModel
    );

    const updateBuildingLocation = UpdateBuildingLocation(
      buildingLocationRepository
    );
    const buildingLocation = await updateBuildingLocation(req.params.id,req.body, lang, t);

    res.status(200).json({
      message: t("", lang),
      data: buildingLocation,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(t("", lang), "", 401);
    }
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const buildingLocationModel = req.BuildingLocation;
    const buildingLocationRepository = new BuildingLocationRepositoryMongo(
      buildingLocationModel
    );
    const deleteBuildingLocation = DeleteBuildingLocation(buildingLocationRepository);
    const buildingLocation = await deleteBuildingLocation(req.params.id, lang, t);

    res.status(200).json({
      message: t("", lang),
      data: buildingLocation,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(t("", lang), "", 401);
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
