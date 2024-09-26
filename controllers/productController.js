const presentationModel = require('../models/presentationModel');
const brandModel = require('../models/brandModel');
const productModel = require('../models/productModel');
const models = require('../models/index');

module.exports = {

    //All products
    async getProducts(req, res) {
        try {
            const products = await productModel.findAll({
                include: [
                    {
                        model: presentationModel,
                        as: 'presentation'
                    },
                    {
                        model: brandModel,
                        as: 'brand'
                    }
                ]
            });
            res.json(products);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //All product with status 1
    async getProductsActive(req, res) {
        try {
            const products = await productModel.findAll({
                where: {
                    status: 1
                },
                include: [
                    {
                        model: presentationModel,
                        as: 'presentation'
                    },
                    {
                        model: brandModel,
                        as: 'brand'
                    }
                ]
            });
            res.json(products);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //All product with status 0
    async getProductsInactive(req, res) {
        try {
            const products = await productModel.findAll({
                where: {
                    status: 0
                },
                include: [
                    {
                        model: presentationModel,
                        as: 'presentation'
                    },
                    {
                        model: brandModel,
                        as: 'brand'
                    }
                ]
            });
            res.json(products);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await productModel.findByPk(id, {
                include: [
                    {
                        model: presentationModel,
                        as: 'presentation'
                    },
                    {
                        model: brandModel,
                        as: 'brand'
                    }
                ]
            });
            res.json(product);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //Update product stock
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { stock, product_name, price, discount_price, discount, product_description, image, brand_id, presentation_id, status } = req.body;
            const product = await productModel.findByPk(id);
            product.stock = stock;
            product.product_name = product_name;
            /*product.price = price;
            product.discount_price = discount_price;
            product.discount = discount;
            product.product_description = product_description;
            product.image = image;
            product.brand_id = brand_id;
            product.presentation_id = presentation_id;*/

            await product.save();
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async createProduct(req, res) {
        try {
            const { product_name, price, discount_price, discount, product_description, image, stock, brand_id, presentation_id, status } = req.body;
            const product = await productModel.create({ product_name, price, discount_price, discount, product_description, image, stock, brand_id, presentation_id, status });
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },
    
    async sellProduct(req, res) {
        try {
            const { id } = req.params;
            const { stock } = req.body;
            const product = await productModel.findByPk(id);
            product.stock = product.stock - stock;
            await product.save();
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async buyProduct(req, res) {
        try {
            const { id } = req.params;
            const { stock } = req.body;
            const product = await productModel.findByPk(id);
            product.stock = product.stock + stock;
            await product.save();
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Change status to 0
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await productModel.findByPk(id);
            product.status = 0;
            await product.save();
            res.json({ message: 'Producto eliminado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Change status to 1
    async activateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await productModel.findByPk(id);
            product.status = 1;
            await product.save();
            res.json({ message: 'Producto activado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }
}