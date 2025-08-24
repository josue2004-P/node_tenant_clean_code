const bcrypt = require("bcryptjs");
const { ApiError } = require("../../../utils/ApiError");


module.exports = (userRepository) => {
  return async (dbName, lang, t) => {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const defaultUser = {
      firstName: "Usuario",
      lastName: "Predeterminado",
      middleName: "Ficticio",
      username: "usuario1",
      email: "usuario@example.com",
      password: hashedPassword,
    };

    const user = await userRepository.createUserDefault(dbName,defaultUser);
    return user;


  };
};
