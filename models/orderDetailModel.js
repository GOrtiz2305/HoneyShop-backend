const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const OrderDetail = sequelize.define('orderdetails', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = OrderDetail;