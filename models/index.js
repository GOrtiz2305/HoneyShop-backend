const Product = require('./productModel');
const Presentation = require('./presentationModel');
const Brand = require('./brandModel');
const Client = require('./clientModel');
const Order = require('./orderModel');

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

Client.hasMany(Order, {
    foreignKey: 'client_id',
    as: 'orders'
});

Order.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

// Export the models
module.exports = {
    Product,
    Presentation,
    Brand,
    Client,
};
