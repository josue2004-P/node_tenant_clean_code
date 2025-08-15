const { ApiError } = require("../../../utils/ApiError");

const bcrypt = require("bcryptjs");

module.exports = (userRepository) => {
  return async (userData, lang, t) => {
    if (!userData.password) {
      throw new Error("Password is required");
    }

    // Verificar si ya existe un usuario con el mismo email
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError(t("emailExists", lang), "EXISTIS_EMAIL", 409);
    }

    // Puedes agregar también verificación por username si quieres
    if (userRepository.findByUsername) {
      const existingUsername = await userRepository.findByUsername(
        userData.username
      );
      if (existingUsername) {
        throw new ApiError(t("usernameExists", lang), "EXISTIS_USERNAME", 409);
      }
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userToSave = {
      ...userData,
      password: hashedPassword,
    };

    const createdUser = await userRepository.create(userToSave);

    // Retornar solo campos necesarios
    return {
      firstName: createdUser.firstName,
      username: createdUser.username,
      email: createdUser.email,
    };
  };
};
