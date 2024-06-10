const { DataTypes } = require("sequelize");
const db = require("../infrastructure/database");

module.exports = db.define("usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
