// src/models/user.model.js
// ⚠️ Solo para pruebas. Más adelante conecta a una base de datos.

const bcrypt = require('bcrypt');

// Simulamos un usuario ya registrado
// password en texto plano: "123456"
const hashedPassword = bcrypt.hashSync('123456', 10);

const dummyUser = {
  id: 1,
  email: 'user@example.com',
  password: hashedPassword, // contraseña hasheada
  name: 'Usuario Demo'
};

async function findUserByEmail(email) {
  // Aquí más adelante harías una consulta a la BD
  if (email === dummyUser.email) {
    return dummyUser;
  }
  return null;
}

module.exports = {
  findUserByEmail
};
