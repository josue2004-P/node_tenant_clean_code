const UserRepository = require("../../../infrastructure/mongo/repositories/userRepository.mongo");

const LoginUser = require("../../../application/use_cases/authentication/LoginUser");
const RenewToken = require("../../../application/use_cases/authentication/RenewToken");

const { ApiError } = require("../../../utils/ApiError");

const { t } = require("../../../utils/translator");
const lang = require("../../../config/lang");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userRepository = new UserRepository(req.User);

    const executeLogin = LoginUser(userRepository);
    const result = await executeLogin({ email, password }, lang, t);

    return res.status(200).json(result);
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(t("loginFailed", lang), "LOGIN_FAILED", 401);
    }
    next(err);
  }
};

const renewToken = async (req, res, next) => {
  try {
    const useCase = RenewToken();
    const result = await useCase(req.user);

    return res.status(200).json(result);
  } catch (err) {
    if (!(err instanceof ApiError)) {
      err = new ApiError(
        t("tokenRenewalFailed", lang),
        "TOKEN_RENEWAL_FAILED",
        401
      );
    }
    next(err);
  }
};

module.exports = {
  login,
  renewToken,
};
