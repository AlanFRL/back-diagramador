// File: Colaboracion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Diagram = require('./Diagram');

const Colaboracion = sequelize.define('Colaboracion', {
    role: { 
        type: DataTypes.ENUM('admin', 'colaborador'), 
        allowNull: false 
    }
});

// // Relación hacia User y Diagram
Colaboracion.belongsTo(User);
Colaboracion.belongsTo(Diagram);

// // Definir las relaciones de muchos a muchos entre User y Diagram
User.belongsToMany(Diagram, { through: Colaboracion });
Diagram.belongsToMany(User, { through: Colaboracion });

module.exports = Colaboracion;
