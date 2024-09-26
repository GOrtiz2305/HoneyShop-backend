const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('roles', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Role;