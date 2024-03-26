const { DataTypes, Model } = require("sequelize");
const db = require("../infrastructure/database");

module.exports = db.define('pessoa',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isCpf: true,
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["ativo", "inativo"],
        allowNull: false,
        defaultValue: "inativo",
      },
    }
)


