const roleModel = require('../models/roleModel');

module.exports = {
    async getRoles(req, res) {
        try {
            const roles = await roleModel.findAll();
            res.json(roles);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    async getRoleById (req, res) {
        try {
            const { id } = req.params;
            const role = await roleModel.findByPk(id);
            res.json(role);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    async createRole(req, res) {
        try {
            const { name, description } = req.body;
            const role = await roleModel.create({ name, description });
            res.json(role);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async updateRole(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            await roleModel.update({ name, description }, { where: { id } });
            res.json({
                message: 'Role actualizado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Logical deletion
    async deleteRole(req, res) {
        try {
            const { id } = req.params;
            await roleModel.update({ status: false }, { where: { id } });
            res.json({
                message: 'Role eliminado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }
}