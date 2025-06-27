# INTEGRAR DIRENTES REPOSITORY (MONGO O MYSQL);
### Sustituir 

# IMPORTAR CONEXION MYSQL
const connectMySQL = require("../../../infrastructure/mysql/connection");

## IMPORTAR REPOSITORY
const UserRepositoryMysql = require("../../../infrastructure/mysql/repositories/userRepository.mysql");
const UserRepositoryMongo = require("../../../infrastructure/mongo/repositories/userRepository.mongo");

## IMPLEMENTAR MYSQL
const db = await connectMySQL()
const userRepository = new UserRepositoryMysql(db);

## IMPLEMENTAR MONGO
const userModel = req.User;
const userRepository = new UserRepositoryMongo(userModel);