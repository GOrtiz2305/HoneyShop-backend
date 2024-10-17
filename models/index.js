const Product = require('./productModel');
const Presentation = require('./presentationModel');
const Brand = require('./brandModel');

// Define the associations here
Presentation.hasMany(Product, {
    foreignKey: 'id',
    as: 'products'
});

Product.belongsTo(Presentation, {
    foreignKey: 'id',
    as: 'presentation'
});

Brand.hasMany(Product, {
    foreignKey: 'id',
    as: 'products'
});

Product.belongsTo(Brand, {
    foreignKey: 'id',
    as: 'brand'
});

// Export the models
module.exports = {
    Product,
    Presentation,
    Brand
};
