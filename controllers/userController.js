const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await userModel.findAll();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //GET USER BY EMAIL AND PASSWORD
    async getUserByEmailAndPassword(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ where: { email, password } });
            if (user) {
                const token = jwt.sign({ user }, 'secretkey', { expiresIn: '10m' });
                res.json({ token });
            } else {
                res.status(401).json({ error: "Usuario no encontrado" });
            }
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Handle specific error types here (e.g., duplicate email)
                res.status(400).json({ error: "Error específico relacionado con la base de datos" });
              } else {
                res.status(500).json({ error: "Error interno del servidor" }); // Use status 500 for internal server errors
              }
        }
    },
   

    async createUser(req, res) {
        try {
            const { full_name, email, password } = req.body;

            /*bcrypt.hash(password.toString(), 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.json({ error: "Error for hassing password" });
                }
                
            })*/

            const user = await userModel.create({ email, password });
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { full_name, email, password } = req.body;
            await userModel.update({ full_name, email, password }, { where: { id } });
            res.json({
                message: 'Usuario actualizado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //Logical delete

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await userModel.update({ status: false }, { where: { id } });
            res.json({
                message: 'Usuario eliminado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },
}