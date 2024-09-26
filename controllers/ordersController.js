const ordersController = require('../controllers/ordersController');

module.exports = {
    async getOrders(req, res) {
        try {
            const orders = await ordersController.getOrders();
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

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

    async createOrder(req, res) {
        try {
            const { client_id, date, status, totalAmount, address, paymentMethod } = req.body;
            const order = await ordersController.createOrder(client_id, date, status, totalAmount, address, paymentMethod);
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Update status of order
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await ordersController.updateOrder(id, status);
            res.json({
                message: 'Orden actualizada'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
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