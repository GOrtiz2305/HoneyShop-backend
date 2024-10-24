const userModel = require('../models/userModel');
const clientModel = require('../models/clientModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    //CREATE client and user
    async createClient(req, res) {
        try {
            const { full_name, email, password, names, last_names, address, phone } = req.body;
            const user = await userModel.create({ full_name, email, password });
            const client = await clientModel.create({ names, last_names, address, email, phone, user_id: user.id });
            res.json(client);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //GET all clients
    async getClients(req, res) {
        try {
            const clients = await clientModel.findAll();
            res.json(clients);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //GET client by id
    async getClient(req, res) {
        try {
            const { id } = req.params;
            const client = await clientModel.findByPk(id);
            res.json(client);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //GET client by user_id
    async getClientByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const client = await clientModel.findOne({ where: { user_id } });
            res.json(client);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //UPDATE client
    async updateClient(req, res) {
        try {
            const { id } = req.params;
            const { names, last_names, address, phone } = req.body;
            const client = await clientModel.update({ names, last_names, address, phone }, { where: { id } });
            res.json(client);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },
}
