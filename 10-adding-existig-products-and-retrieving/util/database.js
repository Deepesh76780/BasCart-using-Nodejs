const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Nana1nani!@#', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
