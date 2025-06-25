const connectMySQL = require('../../../infrastructure/mysql/connection');
const UserRepository = require('../../../infrastructure/mysql/repositories/userRepository.mysql');
const CreateUser = require('../../../application/use_cases/user/CreateUser');
const GetAllUsers = require('../../../application/use_cases/user/GetAllUser');

const create = async (req, res) => {
  try {
    const db = await connectMySQL(); // 🟡 Esperar conexión
    const userRepository = new UserRepository(db);

    const createUser = CreateUser(userRepository);
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const db = await connectMySQL(); // 🟡 Esperar conexión
    const userRepository = new UserRepository(db);

    const getAllUsers = GetAllUsers(userRepository);
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
};
