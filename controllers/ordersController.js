const orderModel = require('../models/orderModel');
const orderDetailModel = require('../models/orderDetailModel');
const Product = require('../models/index').Product;
const productController = require('../controllers/productController');
const Client = require('../models/index').Client;

module.exports = {

    //GET all orders
    async getOrders(req, res) {
        try {
            const orders = await orderModel.findAll(
                { 
                    include: { 
                        model: Client,
                        as: 'client'
                    } 
                }
            );
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //Get all orderes where status is pending
    async getPendingOrders(req, res) {
        try {
            const orders = await orderModel.findAll(
                { 
                    include: { 
                        model: Client,
                        as: 'client'
                    },
                    where: { 
                        status: 'Pending'
                    } 
                }
            );
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    //GET all orders where status is delivered
    async getDeliveredOrders(req, res) {
        try {
            const orders = await orderModel.findAll(
                { 
                    include: { 
                        model: Client,
                        as: 'client'
                    },
                    where: { 
                        status: 'Delivered' 
                    } 
                });
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    //GET order by id
    async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderModel.findOne(
                { 
                    include: { 
                        model: Client,
                        as: 'client'
                    },
                    where: { 
                        id 
                    } 
                }
            );
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async getOrdersByClientId(req, res) {
        try {
            const { client_id } = req.params;

            const orders = await orderModel.findAll({ 
                include: { 
                    model: Client,
                    as: 'client'
                },
                where: { 
                    client_id 
                } 
            });
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    //CREATE order and order details
    async createOrder(req, res) {
        try {
            // Order header 
            const { client_id, date, totalAmount, address, paymentMethod, notes, products } = req.body;
            const order = await orderModel.create({ client_id, date, totalAmount, address, paymentMethod, notes });

            // Order details and calculating total
            let total = 0;

            // Maps through products and creates order details
            const productPromises = products.map(async product => {
                const { product_id, quantity } = product;

                //Get product
                let individual_product = await Product.findByPk(product_id);

                //Calculate subtotal
                const subtotal = individual_product.price * product.quantity;
                const order_id = order.id;
                total += subtotal;

                //Update product stock
                await productController.updateProductStock(product_id, quantity);

                //Create order detail
                return orderDetailModel.create({ order_id, product_id, quantity, subtotal });
            });

            await Promise.all(productPromises);

            // Update total amount of order
            order.totalAmount = total;
            await order.save();

            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    //Update status of order to delivered
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderModel.findOne({ where: { id } });

            if (order) {
                order.status = 'Delivered';
                await order.save();
                res.json(order);
            } else {
                res.status(404).json({ message: 'Orden no encontrada' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
}