const presentationModel = require('../models/presentationModel');
const brandModel = require('../models/brandModel');
const productModel = require('../models/productModel');
const models = require('../models/index');

module.exports = {

    //GET all products
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

    //GET all products with status 1
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

    //GET all products with status 0
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

    //GET product by id
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

    //Update product
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { stock, product_name, price, discount_price, discount, product_description, image, brand_id, presentation_id, status } = req.body;
            const product = await productModel.findByPk(id);
            product.stock = stock;
            product.product_name = product_name;
            product.price = price;
            product.product_description = product_description;

            await product.save();
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Update product stock
    async updateProductStock(product_id, quantity) {
        try {
            const product = await productModel.findByPk(product_id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const updatedStock = product.stock - quantity;

            if (updatedStock < 0) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }

            product.stock = updatedStock;
            await product.save();

            return product;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    //Create product
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

    //Sell product
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

    //Buy product
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

    //Logic delete, change status to 0
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

    //Activate product, change status to 1
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
    },

    //Get product where name is like, for search
    async getProductByName(req, res) {
        try {
            const { product_name } = req.body;

            // Validación básica
            if (!product_name || typeof product_name !== 'string') {
                return res.status(400).json({ error: 'El nombre del producto es requerido y debe ser una cadena' });
            }

            const products = await productModel.findAll({
                where: {
                    product_name: {
                        [Op.iLike]: `%${product_name}%` // Búsqueda sin distinción de mayúsculas y minúsculas
                    }
                }
            });

            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al buscar productos' });
        }
    }
}