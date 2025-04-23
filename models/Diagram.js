const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Diagram = sequelize.define('Diagram', {
    name: { type: DataTypes.STRING, allowNull: false },
    roomCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  // Asegúrate de que sea único para evitar duplicados
    },
    model: { type: DataTypes.JSON }
});
// Diagram.belongsToMany(User, { through: 'Colaboracion' });

module.exports = Diagram;
