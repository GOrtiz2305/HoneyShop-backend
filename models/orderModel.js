const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('orders', {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'En proceso'
    },
    totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Order;