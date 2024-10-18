// models/users.js
const bcrypt = require('bcryptjs');

const users = []; // In-memory "database"

module.exports = {
  createUser: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    return newUser;
  },

  findUser: (username) => {
    return users.find(user => user.username === username);
  }
};
