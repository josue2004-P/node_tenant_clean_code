const MedicalEquipmentRepositoryMongo = require("../../../infrastructure/mongo/repositories/medicalEquipmentRepository.mongo");

const CreateProfile = require("../../../application/use_cases/profiles/CreateProfile");
const GetAllProfiles = require("../../../application/use_cases/profiles/GetAllProfiles");
const GetProfileById = require("../../../application/use_cases/profiles/GetProfileById");
const UpdateProfile = require("../../../application/use_cases/profiles/UpdateProfile");
const DeleteProfile = require("../../../application/use_cases/profiles/DeleteProfile");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const lang = require("../../../config/lang");

const create = async (req, res, next) => {
  try {
    // const profileModel = req.Profile;
    // const profileRepository = new ProfileRepositoryMongo(profileModel);

    // const createProfile = CreateProfile(profileRepository);
    // const profiles = await createProfile(req.body, lang, t);

    res.status(200).json({
      message: t("Chido", lang),
      // profiles,
    });
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("", lang),
        "",
        401
      );
    }
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    // const profileModel = req.Profile;
    // const profileRepository = new ProfileRepositoryMongo(profileModel);

    // const getAllProfiles = GetAllProfiles(profileRepository);
    // const profiles = await getAllProfiles(lang, t);

    res.status(200).json({
      message: t("", lang),
      // profiles,
    });
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("", lang),
        "",
        401
      );
    }
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    // const profileModel = req.Profile;
    // const profileRepository = new ProfileRepositoryMongo(profileModel);

    // const getProfileById = GetProfileById(profileRepository);
    // const profile = await getProfileById(req.params.id,lang, t);

    res.status(200).json({
      message: t("", lang),
      // data: profile,
    });
  } catch (error) {
    console.log(error)
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("", lang),
        "",
        401
      );
    }
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // const profileModel = req.Profile;
    // const profileRepository = new ProfileRepositoryMongo(profileModel);

    // const updateProfile = UpdateProfile(profileRepository);
    // const profile = await updateProfile(req.params.id, req.body, lang, t);

    res.status(200).json({
      message: t("", lang),
      // data: profile,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("", lang),
        "",
        401
      );
    }
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    // const profileModel = req.Profile;
    // const profileRepository = new ProfileRepositoryMongo(profileModel);

    // const deleteProfile = DeleteProfile(profileRepository);
    // const profile = await deleteProfile(req.params.id, req.body, lang, t);

    res.status(200).json({
      message: t("", lang),
      // data: profile,
    });
  } catch (error) {
    console.log(error);
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        t("", lang),
        "",
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
  deleted
};
