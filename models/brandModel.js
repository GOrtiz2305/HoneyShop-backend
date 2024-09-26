const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');
const Product = require('./productModel');

const Brand = sequelize.define('brands', {
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Brand;