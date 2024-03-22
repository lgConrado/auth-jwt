import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

const pessoas = [
  {
    id: 1,
    nome: "João da Silva",
    email: "joao@example.com",
    telefone: "(00) 1234-5678",
    nascimento: "1990-05-15",
    cpf: "123.456.789-00",
    status: "ativo",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria@example.com",
    telefone: "(00) 9876-5432",
    nascimento: "1985-10-20",
    cpf: "987.654.321-00",
    status: "ativo",
  },
];

const buscaPosicaoPessoa = (id) => {
  return pessoas.findIndex((pessoa) => {
    return pessoa.id === Number(id);
  });
};

const cadastraPessoa = (data) => {
  const pessoa = {
    id: pessoas.length + 1,
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    nascimento: data.nascimento,
    cpf: data.cpf,
    status: data.status,
  };
  pessoas.push(pessoa);
};

const atualizaPessoa = (index, data) => {
  pessoas[index].nome = data.nome;
  pessoas[index].email = data.email;
  pessoas[index].telefone = data.telefone;
  pessoas[index].nascimento = data.nascimento;
  pessoas[index].cpf = data.cpf;
  pessoas[index].status = data.status;
};

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});

app.get("/pessoas", (_, res) => {
  res.status(200).send({ pessoas });
});

app.get("/pessoas/:id", (req, res) => {
  const index = buscaPosicaoPessoa(req.params.id);
  res.status(200).send(pessoas[index]);
});

app.post("/pessoas", (req, res) => {
  cadastraPessoa(req.body);
  res.status(201).send("Cadastro Realizado");
});

app.put("/pessoas/:id", (req, res) => {
  const index = buscaPosicaoPessoa(req.params.id);
  atualizaPessoa(index, req.body);
  res.status(200).send("Cadastro Atualizado");
});

app.delete("/pessoas/:id", (req, res) => {
  res.status(200).send();
});
