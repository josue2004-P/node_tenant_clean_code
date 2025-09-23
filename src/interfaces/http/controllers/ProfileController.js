const ProfileRepositoryMongo = require("../../../infrastructure/mongo/repositories/profileRepository.mongo");

const CreateProfile = require("../../../application/use_cases/profiles/CreateProfile");
const GetAllProfiles = require("../../../application/use_cases/profiles/GetAllProfiles");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const lang = require("../../../config/lang");

const create = async (req, res, next) => {
  try {
    const profileModel = req.Profile;
    const profileRepository = new ProfileRepositoryMongo(profileModel);

    const createProfile = CreateProfile(profileRepository);
    const profiles = await createProfile(req.body, lang, t);

    res.status(200).json({
      message: t("userCreated", lang),
      profiles,
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
    const profileModel = req.Profile;
    const profileRepository = new ProfileRepositoryMongo(profileModel);

    const getAllProfiles = GetAllProfiles(profileRepository);
    const profiles = await getAllProfiles(lang, t);

    res.status(200).json({
      message: t("usersRetrieved", lang),
      profiles,
    });
  } catch (err) {
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
