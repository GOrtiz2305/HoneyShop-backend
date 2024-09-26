const {sequelize} = require('../database/database');
const { DataTypes } = require('sequelize');

const Presentation = sequelize.define('presentations', {
    presentation_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Presentation;