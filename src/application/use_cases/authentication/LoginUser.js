const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../../../config/jwt.config");

module.exports = (userRepository) => {
  return async ({ email, password }, lang, t) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error(t("emailNotFound", lang));

    const validPassword = await user.comparePassword(password);

    if (!validPassword) throw new Error(t("incorrectPassword", lang));

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
