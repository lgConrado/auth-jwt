const usuario = require("../models/usuarioModel");

const listaUsuarios = async (_, res) => {
  try {
    const usuarios = await usuario.findAll();
    res.status(200).send({ ...usuarios });
  } catch (error) {
    res.status(500).send(error);
  }
};

const selecionaUsuario = async (req, res) => {
  try {
    const usuarioSelecionada = await usuario.findOne({
      where: { id: req?.params?.id },
    });

    res.status(200).send({ ...usuarioSelecionada });
  } catch (error) {
    res.status(500).send(error);
  }
};

const adicionaUsuario = async (req, res) => {
  try {

    const usuarioExistente = await usuario.findOne({
      where: { nome: req.body.nome },
    });
    if (usuarioExistente) {
      res.status(400).send({ error: "Usuário já cadastrado!" });
      return;
    }

    const usuarioCadastrado = await usuario.create({ ...req.body });
    res.status(201).send({ ...usuarioCadastrado });
  } catch (error) {
    res.status(500).send(error);
  }
};

const editaUsuario = async (req, res) => {
  try {

    await usuario.update({ ...req.body }, { where: { id: req.params.id } });

    res.status(200).send("Registro alterado");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletaUsuario = async (req, res) => {
  try {
    if (!req?.params?.id) {
      throw Error("Id não fornecido");
    }
    await usuario.destroy({
      where: { id: req?.params?.id },
    });

    res.status(200).send("Registro excluído");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  adicionaUsuario,
  deletaUsuario,
  editaUsuario,
  listaUsuarios,
  selecionaUsuario,
};
