// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/auth.controller.js');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;