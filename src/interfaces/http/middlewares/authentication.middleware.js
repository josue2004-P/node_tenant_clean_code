const { t } = require("../../../utils/translator");
const defaultLang = require("../../../config/lang");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../config/jwt.config");

module.exports = (req, res, next) => {
  // Read token from custom header
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ message: t("tokenNotProvided", defaultLang) });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // You can access it like req.user.id, req.user.email, etc.
    next();
  } catch (error) {
    return res.status(401).json({ message: t("invalidOrExpiredToken", defaultLang) });
  }
};
