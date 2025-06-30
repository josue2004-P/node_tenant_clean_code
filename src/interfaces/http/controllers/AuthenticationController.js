const UserRepository = require("../../../infrastructure/mongo/repositories/userRepository.mongo");

const LoginUser = require("../../../application/use_cases/authentication/LoginUser");
const RenewToken = require("../../../application/use_cases/authentication/RenewToken");

const { t } = require("../../../utils/translator");
const defaultLang = require("../../../config/lang");

const login = async (req, res) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepository(userModel);

    const loginUser = LoginUser(userRepository);
    const result = await loginUser(req.body, defaultLang, t);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message || t("loginFailed", defaultLang),
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const useCase = RenewToken();
    const result = await useCase(req.user); // req.user comes from middleware
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: t("tokenRenewalFailed", defaultLang) });
  }
};

module.exports = {
  login,
  renewToken,
};
