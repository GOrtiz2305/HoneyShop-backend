const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const Client = sequelize.define('clients', {
    names: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_names: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

module.exports = Client;