const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

module.exports = User;