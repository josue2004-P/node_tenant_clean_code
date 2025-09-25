const { ApiError } = require("../../../utils/ApiError");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

module.exports = (userRepository) => {
  return async (id, data, lang, t) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(t("invalidObjectId", lang), "INVALID_OBJECT_ID", 404);
    }

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    const user = await userRepository.update(id, data);

    if (!user) {
      throw new ApiError(t("noCompanyFound", lang), "NO_COMPANY_FOUND", 404);
    }

    // Retornar solo campos necesarios
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      profiles: user.profiles,
    };
  };
};
