const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../../../config/jwt.config");

const { ApiError } = require("../../../utils/ApiError");

module.exports = (userRepository) => {
  return async ({ email, password }, lang, t) => {
    const user = await userRepository.findByEmail(email);
    if (!user)
      throw new ApiError(t("emailNotFound", lang), "EMAIL_NOT_FOUND", 404);

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      throw new ApiError(
        t("incorrectPassword", lang), 
        "INCORRECT_PASSWORD", 
        401 
      );
    }
    // Generate token
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  };
};
