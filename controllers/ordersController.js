const orderModel = require('../models/orderModel');
const orderDetailModel = require('../models/orderDetailModel');
const productModel = require('../models/productModel');
const productController = require('../controllers/productController');
const ordersController = require('../controllers/ordersController');

module.exports = {
    //Gets all orders
    async getOrders(req, res) {
        try {
            const orders = await ordersController.getOrders();
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //Gets order by id
    async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await ordersController.getOrder(id);
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Create order and order details
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
            
            //Get product price
            let individual_product = await productModel.findByPk(product_id);

            //Calculate subtotal
            const subtotal = individual_product.price * product.quantity;
            const order_id = order.id;
            total += subtotal;

            //Update product stock
            await productController.updateProductStock(product_id, quantity);

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

    //Update status of order
    async updateOrder(req, res) {
        try {
            await orderModel.update({ status }, {
                where: { id: orderId }
            });
        } catch (error) {
            throw new Error('Error al actualizar el monto total de la orden');
        }
    },

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            await ordersController.deleteOrder(id);
            res.json({
                message: 'Orden eliminada'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }
}