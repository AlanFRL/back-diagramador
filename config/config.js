require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT:process.env.DB_PORT,
    JWT_SECRET: process.env.JWT_SECRET
};

/*
Este archivo configura las variables de entorno necesarias para el funcionamiento del sistema:

PORT: Puerto donde el servidor escucha.
DB_*: Configuración de la base de datos (nombre, usuario, contraseña, host y puerto).
JWT_SECRET: Clave secreta para la generación y verificación de tokens JWT.
*/