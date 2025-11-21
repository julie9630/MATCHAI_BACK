// src/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// POST api/auth/Login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validacion basica
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contrasela son obligatorios'
            });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                message: 'Credenciales inválidas (usuario no encontrado)'
            });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Credenciales inválidas (contraseña incorrecta)'
            });
        }

        // Generar token JWT
        const payload = {
            sub: user.id,
            email: user.mail,
            name: user.name
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        return res.status(200).json({
            message: 'Login extitoso',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({
            message: 'Error interno en el servidor'
        });
    }
}

// POST api/auth/logout
function logout(req, res){
    
    // borrar el token en el cliente 
    
    return res.status(200).json({
    message:
      'Logout realizado. El cliente debe eliminar el token almacenado localmente.'
  });
}

module.exports = {
    login, 
    logout
};