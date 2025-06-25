const UserRepository = require("../../../infrastructure/mongo/repositories/userRepository.mongo");

const LoginUser = require("../../../application/use_cases/authentication/LoginUser");
const RenewToken = require("../../../application/use_cases/authentication/RenewToken");

const login = async (req, res) => {
  try {
    const userModel = req.User;
    const userRepository = new UserRepository(userModel);

    const loginUser = LoginUser(userRepository);
    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};

const renewToken = async (req, res) => {
  try {
    const useCase = RenewToken();
    const result = await useCase(req.user); // req.user comes from middleware
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: "Failed to renew token" });
  }
};

module.exports = {
  login,
  renewToken
};
