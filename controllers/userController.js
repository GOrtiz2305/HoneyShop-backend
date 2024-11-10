const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    //GET all users
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

            // Find the user by email
            const user = await userModel.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: "Usuario no encontrado" });
            }

            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Generate a JWT token on successful login
                const id = user.id;
                const role = user.role_id;
                const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                return res.json({ auth: true, token: token, id: id, role: role });
            } else {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Handle specific error types here (e.g., duplicate email)
                res.status(400).json({ error: "Error específico relacionado con la base de datos" });
            } else {
                res.status(500).json({ error: "Error interno del servidor" }); // Use status 500 for internal server errors
            }
        }
    },

    //Verify JWT token
    async verifyToken(req, res) {
        try {
            const token = req.headers['x-access-token'];
            if (!token) {
                return res.status(401).json({ auth: false, message: 'No token provided' });
            }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
                } else {
                    res.json({ auth: true, message: 'Token verified' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async verificationOfToken(req, res, next) {
        const token = req.headers['x-access-token'];

        // Verifica si el token está presente
        if (!token) {
            return res.status(403).json({ auth: false, message: 'No token provided.' });
        }

        // Verifica si el token es válido
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
            }

            next(); // Continúa con la siguiente función
        });
    },

    async verificationOfTokenAndRole(req, res, next) {
        const token = req.headers['x-access-token'];
    
        // Verifica si el token está presente
        if (!token) {
            return res.status(403).json({ auth: false, message: 'No token provided.' });
        }
    
        // Verifica si el token es válido
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
            }
    
            // Token válido, verifica el rol
            if (decoded.role === 2) {
                req.userRole = decoded.role; // Puedes guardar el rol o cualquier otro dato que necesites
                next(); // Continúa con la siguiente función
            } else {
                // Si el rol no es 2, devuelve un error
                return res.status(403).json({ auth: false, message: 'Insufficient permissions.' });
            }
        });
    },

    //POST create user
    async createUser(req, res) {
        try {
            const { email, password } = req.body;

            // Hash the password before creating the user
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await userModel.create({ email, password: hashedPassword });

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //PUT update user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { email, password, role_id } = req.body;
            await userModel.update({ email, password, role_id }, { where: { id } });
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