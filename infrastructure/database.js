const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: '../database.sqlite' // Caminho para o arquivo SQLite
});

module.exports = db;