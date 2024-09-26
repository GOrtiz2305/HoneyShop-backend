const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('products', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    discount: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    product_description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    presentation_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Product;