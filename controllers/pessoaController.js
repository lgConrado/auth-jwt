const { validaCpf } = require("../utils/validaCpf");
const { formataData } = require("../utils/formataData");
const { formataCpf } = require("../utils/formataCpf");

const pessoa = require("../models/pessoaModel");

const listaPessoas = async (_, res) => {
  try {
    const pessoas = await pessoa.findAll();
    res.status(200).send({ ...pessoas });
  } catch (error) {
    res.status(500).send(error);
  }
};

const selecionaPessoa = async (req, res) => {
  try {
    const pessoaSelecionada = await pessoa.findOne({
      where: { id: req?.params?.id },
    });

    res.status(200).send({ ...pessoaSelecionada });
  } catch (error) {
    res.status(500).send(error);
  }
};

const filtraPessoaCpf = async (req, res) => {
  try {
    if (!req?.params?.cpf) {
      throw Error("CPF não fornecido");
    }

    const cpf = req.params.cpf;
    const pessoaFiltrada = await pessoa.findOne({
      where: { cpf: cpf },
    });

    if (!pessoaFiltrada) {
      res.status(404).send({ error: "Pessoa não encontrada" });
      return;
    }

    res.status(200).send({ ...pessoaFiltrada });
  } catch (error) {
    res.status(500).send(error);
  }
};

const adicionaPessoa = async (req, res) => {
  try {
    req.body.cpf = formataCpf(req.body.cpf);

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

    req.body.nascimento = formataData(req.body.nascimento);

    const pessoaCadastrada = await pessoa.create({ ...req.body });
    res.status(201).send({ ...pessoaCadastrada });
  } catch (error) {
    res.status(500).send(error);
  }
};

const editaPessoa = async (req, res) => {
  try {
    req.body.nascimento = formataData(req.body.nascimento);

    await pessoa.update({ ...req.body }, { where: { id: req.params.id } });

    res.status(200).send("Registro alterado");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletaPessoa = async (req, res) => {
  try {
    if (!req?.params?.id) {
      throw Error("Id não fornecido");
    }
    await pessoa.destroy({
      where: { id: req?.params?.id },
    });

    res.status(200).send("Registro excluído");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  adicionaPessoa,
  deletaPessoa,
  editaPessoa,
  filtraPessoaCpf,
  listaPessoas,
  selecionaPessoa,
};
