const mongoose = require('mongoose');

require('dotenv').config();

const DB_CNN = process.env.DB_CNN;

const dbConnection = async () => {
    try {
        await mongoose.connect(`${DB_CNN}`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de inicializar la BD');
    }
};

module.exports = {
    dbConnection
};
