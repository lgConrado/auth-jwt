const validaCpf = require ("../utils/validaCpf");

const pessoa = require("../models/pessoaModel");

const listaPessoas = async (req, res) => {
    console.log("aqui")
  try {
    const pessoas = await pessoa.findAll();
    res.send(pessoas);
  } catch (error) {
    res.status(500).send(error);
  }
};

const selecionaPessoa = async (req, res) => {
  try {
    if (!req?.params?.id) {
      throw Error("Id não fornecido");
    }
    const pessoaSelecionada = await pessoa.findOne({
      where: { id: req?.params?.id },
    });
    res.send(pessoa);
  } catch (error) {
    res.status(500).send(error);
  }
};

const adicionaPessoa = async (req, res) => {
  try {
    const cpfValido = validaCpf(req.body.cpf);
    if (!cpfValido) {
      res.status(400).send({ error: "CPF Invalido" });
      return;
    }
    const pessoaExistente = await pessoa.findOne({
      where: { cpf: req.body.cpf },
    });
    if (pessoaExistente) {
      res.status(400).send({ error: "CPF já cadastrado!" });
      return;
    }
    const pessoaCadastrada = await pessoa.create({ ...req.body });
    res.send(pessoaCadastrada);
  } catch (error) {
    res.status(500).send(error);
  }
};

const editaPessoa = async (req, res) => {
  try {
    if (!req?.params?.id) {
      throw Error("Id não fornecido");
    }
    const pessoaEditada = await pessoa.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );
    res.send(pessoaEditada);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletaPessoa = async (req, res) => {
  try {
    if (!req?.params?.id) {
      throw Error("Id não fornecido");
    }
    const pessoaDeletada = await pessoa.destroy({
      where: { id: req?.params?.id },
    });
    res.send(pessoaDeletada);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  listaPessoas,
  adicionaPessoa,
  deletaPessoa,
  editaPessoa,
  selecionaPessoa,
};
