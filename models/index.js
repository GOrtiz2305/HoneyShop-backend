const Product = require('./productModel');
const Presentation = require('./presentationModel');
const Brand = require('./brandModel');

// Define the associations here
Presentation.hasMany(Product, {
    foreignKey: 'presentation_id',
    as: 'products'
});

Product.belongsTo(Presentation, {
    foreignKey: 'presentation_id',
    as: 'presentation'
});

Brand.hasMany(Product, {
    foreignKey: 'brand_id',
    as: 'products'
});

Product.belongsTo(Brand, {
    foreignKey: 'brand_id',
    as: 'brand'
});

// Export the models
module.exports = {
    Product,
    Presentation,
    Brand
};
