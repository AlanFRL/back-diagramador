const { Sequelize } = require('sequelize');
const config = require('./config'); // Importa el archivo de configuración

console.log('DB Config:', config);

// Configura Sequelize con PostgreSQL usando las variables del archivo config.js
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Unable to connect to PostgreSQL:', err));

module.exports = sequelize;

/*
Maneja la conexión con la base de datos usando Sequelize:

Utiliza las configuraciones definidas en config.js.
Se inicializa con PostgreSQL y autentica la conexión.
Exporta la instancia de Sequelize para ser utilizada en otros archivos.
*/